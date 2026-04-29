exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, message, subject, firstName, lastName } = data;

    const fullName = firstName && lastName ? `${firstName} ${lastName}` : (name || 'Website Visitor');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'White Wings Visa <onboarding@resend.dev>',
        to: ['mrunal@whitewingsvisa.com'],
        subject: subject || 'New Contact Form Submission - White Wings Visa',
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message || 'No message'}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Sent from White Wings Visa Website</p>
        `
      })
    });

    const result = await res.json();

    if (result.error) {
      return { statusCode: 400, body: JSON.stringify(result) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};