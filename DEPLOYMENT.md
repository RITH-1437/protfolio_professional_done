# Vercel Deployment Guide

## Environment Variables Setup

To deploy your portfolio to Vercel, you need to configure the EmailJS environment variables in your Vercel project.

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following three variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key | `hwYjaXfaARoJ1b-WA` |
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID | `service_vulxbtf` |
| `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | `template_lo3avs9` |

4. Make sure to set them for **Production**, **Preview**, and **Development** environments

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy
vercel --prod
```

#### Option B: Deploy via Git
1. Push your code to GitHub/GitLab/Bitbucket
2. Import the repository in Vercel dashboard
3. Vercel will automatically build and deploy

### Step 3: Verify Deployment

After deployment:
1. Visit your deployed site
2. Test the contact form to ensure EmailJS is working correctly

## How It Works

- **Local Development**: Uses `config.js` (not committed to Git)
- **Vercel Production**: Uses environment variables set in Vercel dashboard
- **Build Process**: The `build.js` script replaces placeholders in `index.html` with actual environment variable values during deployment

## Troubleshooting

### Issue: Contact form not working
- Check that all three environment variables are set in Vercel
- Verify the values match your EmailJS account credentials
- Check the browser console for any error messages

### Issue: `412 Gmail_API: Invalid grant`
This means EmailJS can reach your EmailJS service, but the Gmail authorization connected to that service has expired or was revoked.

1. Sign in to your EmailJS dashboard
2. Open **Email Services**
3. Select the Gmail service used by `EMAILJS_SERVICE_ID` (`service_vulxbtf`)
4. Click **Reconnect** or re-authorize the Gmail account
5. Send another test message from the deployed site

If reconnecting the existing service is not available, create a new Gmail service in EmailJS, update `EMAILJS_SERVICE_ID` in Vercel, and redeploy.

### Issue: Build fails on Vercel
- Ensure `build.js`, `vercel.json`, and `package.json` are committed to your repository
- Check the build logs in Vercel dashboard for specific errors

## Local Development

For local development, create a `config.js` file (it's in `.gitignore`):

```javascript
const CONFIG = {
    EMAILJS_PUBLIC_KEY: "your-public-key",
    EMAILJS_SERVICE_ID: "your-service-id",
    EMAILJS_TEMPLATE_ID: "your-template-id"
};
```

Then simply open `index.html` in your browser or use a local server:
```bash
python -m http.server 8000
# or
npx serve
```
