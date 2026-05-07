# Would You Hire Me? 🚀
## Deploy Your Website — Step by Step

### Files in this ZIP:
```
wouldyouhireme/
├── api/
│   └── roast.js       ← backend (keeps your API key safe)
├── public/
│   └── index.html     ← your website (beautiful UI)
├── vercel.json        ← Vercel settings
└── README.md          ← this file
```

---

## STEP 1 — Get Anthropic API Key (free to start)
1. Go to → https://console.anthropic.com
2. Click "Sign Up" → create account
3. Click "API Keys" on left sidebar
4. Click "Create Key" → name it anything
5. COPY the key (starts with sk-ant-...)
6. SAVE it in Notepad — you won't see it again!

---

## STEP 2 — Create GitHub Account (free)
1. Go to → https://github.com
2. Click "Sign Up"
3. Enter email + password + username
4. Verify your email

---

## STEP 3 — Upload Files to GitHub
1. Click "+" top right → "New repository"
2. Name: wouldyouhireme
3. Set to: Public
4. Click "Create repository"
5. Click "uploading an existing file"
6. EXTRACT this ZIP on your computer first
7. Drag ALL files/folders into GitHub upload area
   ⚠️ Make sure api/ and public/ folders are included
8. Click "Commit changes"

---

## STEP 4 — Deploy on Vercel (free)
1. Go to → https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Allow Vercel to access GitHub
4. Click "Add New Project"
5. Find "wouldyouhireme" → click "Import"
6. Don't change anything → click "Deploy"
7. Wait 60 seconds → you'll see 🎉
8. Your site is live!

---

## STEP 5 — Add Your API Key (IMPORTANT!)
Without this the app won't work:
1. In Vercel → click your project
2. Click "Settings" tab
3. Click "Environment Variables" on left
4. Fill in:
   NAME  → ANTHROPIC_API_KEY
   VALUE → paste your key from Step 1
5. Click "Save"
6. Click "Deployments" tab
7. Click "..." next to latest deployment
8. Click "Redeploy" → confirm
9. Wait 30 seconds

---

## STEP 6 — Test It!
1. Go to Overview tab in Vercel
2. Click your website link
3. Upload a resume or paste text
4. Add your target roles
5. Click "Get My Verdict"
6. Share your result! 🎉

---

## Your site URL will be:
https://wouldyouhireme.vercel.app
(or similar — Vercel shows you the exact link)

---

## Cost to run:
- Vercel hosting: FREE
- Anthropic API: ~$0.01-0.03 per roast
- 100 users/day ≈ $1-3/day

## Optional — Custom domain:
- Buy on Namecheap.com (~$10/year)
- Vercel → Settings → Domains → Add domain
