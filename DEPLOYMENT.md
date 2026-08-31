# Vercel Deployment Guide

This portfolio is a static site served by Vercel, with a small **serverless function** (`api/send-email.js`) that delivers contact-form messages via **[Resend](https://resend.com)**.

## Why Resend + a serverless function?

- Resend API keys (`re_...`) are **secret** and must never be exposed to the browser.
- The contact form therefore `POST`s to `/api/send-email`, which reads `RESEND_API_KEY`
  from the server environment and sends the email through Resend.
- The `to` address defaults to `nairithrin143@gmail.com`.

## Step 1: Create a Resend API key

1. Sign in at [resend.com](https://resend.com)
2. Go to **API Keys** and create a new key (copy `re_...`).
3. For sending before verifying a domain: with the default `onboarding@resend.dev`
   sender, Resend allows sending **to your own verified account email** (your Gmail).
   To send to other addresses, you must **verify a domain** under
   **Domains** and add the DNS records Resend provides.

## Step 2: Add environment variables to Vercel

In your Vercel project → **Settings** → **Environment Variables**, add:

| Variable | Value | Notes |
|----------|-------|-------|
| `RESEND_API_KEY` | `re_...` | **Required** — your Resend API key |
| `CONTACT_TO_EMAIL` | `nairithrin143@gmail.com` | Optional — delivery address (default) |
| `CONTACT_FROM_EMAIL` | `onboarding@resend.dev` | Optional — sender (before domain verification) |

Set them for **Production**, **Preview**, and **Development**.

> The old EmailJS variables (`EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`,
> `EMAILJS_TEMPLATE_ID`) are no longer used and can be removed.

## Step 3: Deploy

#### Option A: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

#### Option B: Via Git
1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import it in the Vercel dashboard — Vercel auto-builds using `vercel.json`.
3. Add the environment variables above before/after deploy, then redeploy.

## How it works

- **Static site**: served from the repo root (`index.html`, `styles.css`,
  `script.js`, `images/`, `assets/`) via Vercel's zero-config static hosting.
- **API function**: `vercel.json` uses the `functions` field to build
  `api/send-email.js` with the Node.js runtime; Vercel exposes it at
  `/api/send-email` automatically.
- **Contact form** (`script.js`): on submit, `fetch('/api/send-email', ...)` is called.
- **`api/send-email.js`**: a serverless function that validates the payload and
  calls the Resend API with `RESEND_API_KEY`.
- **Build**: `build.js` copies `index.html`, `styles.css`, `script.js`,
  `README.md`, and the `images/` folder into `dist/` (kept for local/built output;
  the live site serves from the root).

## Troubleshooting

### 404 on `/api/send-email` (form fails to send)
The serverless function is not deployed. Causes and fixes:
- Make sure `api/send-email.js` and `vercel.json` are committed and pushed.
- **Redeploy** the project in Vercel after pushing — any deploy built before the
  `api/` folder existed won't include the function.
- Confirm the deployment's build log shows the function being built.
- After deploying, verify with:
  `curl -X POST https://<your-site>.vercel.app/api/send-email -H "Content-Type: application/json" -d '{}'`
  (you should get a validation error like 400/500, NOT 404).

### "Resend API key is not configured"
`RESEND_API_KEY` is unset in Vercel → add it and redeploy.

### "Missing required fields"
The API expects `name`, `email`, `subject`, and `message` in the JSON body.

### Resend error / `domain not verified`
An unverified sender is being used. Either:
- Keep `CONTACT_FROM_EMAIL=onboarding@resend.dev` and send to your own verified
  account email, or
- Verify a domain under Resend → **Domains** and set `CONTACT_FROM_EMAIL` to
  an address on that domain.

### Build/static assets not loading
Make sure `vercel.json`, `api/send-email.js`, and the root static files are all
committed, and that the project build command is `node build.js`.

## Local Development

The form requires the `/api/send-email` endpoint which only runs on Vercel.
For local testing, either:
- Run a local server and proxy `/api/*` to a local Node handler, or
- Test the deployed endpoint.

You can still open `index.html` directly to preview the layout, but the form
submit will only work when served with the API available.
```bash
python -m http.server 8000
# or
npx serve
```
