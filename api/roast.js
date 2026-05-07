export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { resume, jobs } = req.body;
  if (!resume) return res.status(400).json({ error: 'Resume is required' });

  const jobSection = jobs && jobs.length > 0
    ? `The user is applying for these roles:\n${jobs.map((j,i)=>`${i+1}. ${j}`).join('\n')}\nAnalyze fit for EACH role separately in the "jobFits" array.`
    : 'No specific role mentioned. Give a general analysis.';

  const prompt = `You are a brutally honest but fair senior hiring manager with 15+ years experience across tech and finance. Analyze this resume.

${jobSection}

Resume:
${resume}

Respond ONLY with a valid JSON object. No markdown, no backticks, no extra text:
{
  "score": <number 0-100>,
  "verdictTitle": <punchy 3-5 word verdict>,
  "verdictSub": <one sentence overall hiring decision>,
  "roast": <2-3 sentence brutally honest witty critique with specific resume weaknesses>,
  "scorecard": [
    {"label":"Impact & achievements","score":<0-10>,"comment":<max 8 words>},
    {"label":"Skills relevance","score":<0-10>,"comment":<max 8 words>},
    {"label":"Clarity & formatting","score":<0-10>,"comment":<max 8 words>},
    {"label":"Experience depth","score":<0-10>,"comment":<max 8 words>}
  ],
  "jobFits": [
    {"role":<role name>,"fit":<0-100>,"verdict":<one sentence>,"tip":<one specific tip for this role, max 15 words>}
  ],
  "fixes": [
    {"priority":"high","issue":<max 6 words>,"fix":<max 15 words>},
    {"priority":"high","issue":<max 6 words>,"fix":<max 15 words>},
    {"priority":"medium","issue":<max 6 words>,"fix":<max 15 words>},
    {"priority":"low","issue":<max 6 words>,"fix":<max 15 words>}
  ]
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data));
    if (!data.content) return res.status(500).json({ error: 'API Error: ' + JSON.stringify(data) });
    const text = data.content.map(i => i.text || '').join('');    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
