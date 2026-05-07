export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { resume, jobs } = req.body;
  if (!resume) return res.status(400).json({ error: 'Resume is required' });

  const jobSection = jobs && jobs.length > 0
    ? `The user is applying for these roles:\n${jobs.map((j,i)=>`${i+1}. ${j}`).join('\n')}\nAnalyze fit for EACH role separately in the jobFits array.`
    : 'No specific role mentioned. Give a general analysis.';

  const prompt = `You are a brutally honest but fair senior hiring manager with 15+ years experience. Analyze this resume.\n\n${jobSection}\n\nResume:\n${resume}\n\nRespond ONLY with a valid JSON object. No markdown, no backticks, no extra text:\n{"score":<0-100>,"verdictTitle":"<3-5 word verdict>","verdictSub":"<one sentence>","roast":"<2-3 sentence critique>","scorecard":[{"label":"Impact & achievements","score":<0-10>,"comment":"<8 words>"},{"label":"Skills relevance","score":<0-10>,"comment":"<8 words>"},{"label":"Clarity & formatting","score":<0-10>,"comment":"<8 words>"},{"label":"Experience depth","score":<0-10>,"comment":"<8 words>"}],"jobFits":[{"role":"<role>","fit":<0-100>,"verdict":"<one sentence>","tip":"<15 words>"}],"fixes":[{"priority":"high","issue":"<6 words>","fix":"<15 words>"},{"priority":"high","issue":"<6 words>","fix":"<15 words>"},{"priority":"medium","issue":"<6 words>","fix":"<15 words>"},{"priority":"low","issue":"<6 words>","fix":"<15 words>"}]}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1500 }
        })
      }
    );
    const data = await response.json();
    if (!data.candidates || !data.candidates[0]) {
      return res.status(500).json({ error: 'AI error: ' + JSON.stringify(data) });
    }
    const text = data.candidates[0].content.parts[0].text;
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
}
