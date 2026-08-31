// Vercel serverless function — sends contact form messages via Resend.
// RESEND_API_KEY is a server-side secret; it must be set in the Vercel
// dashboard (Settings → Environment Variables) and is NOT exposed to the browser.
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Resend API key is not configured' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'nairithrin143@gmail.com';
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Portfolio Contact: ${subject}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          '',
          message,
        ].join('\n'),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend error:', result);
      return res.status(response.status).json({ error: result?.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-email error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
