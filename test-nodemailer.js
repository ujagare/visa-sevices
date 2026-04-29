// NodeMailer टेस्ट स्क्रिप्ट
require('dotenv').config();
const nodemailer = require('nodemailer');

// मेल ट्रांसपोर्टर बनाएं
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465', // 465 के लिए true, अन्य पोर्ट के लिए false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// टेस्ट ईमेल भेजें
async function sendTestEmail() {
  try {
    // ईमेल विवरण
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // अपने ही ईमेल पर भेजें
      subject: 'NodeMailer टेस्ट ईमेल',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color: #1e40af;">NodeMailer टेस्ट सफल!</h2>
          <p>यह एक टेस्ट ईमेल है। अगर आपको यह मिल रहा है, तो आपका NodeMailer सेटअप सही काम कर रहा है।</p>
          <p>सर्वर विवरण:</p>
          <ul>
            <li>होस्ट: ${process.env.EMAIL_HOST}</li>
            <li>पोर्ट: ${process.env.EMAIL_PORT}</li>
            <li>यूजर: ${process.env.EMAIL_USER}</li>
          </ul>
          <p>धन्यवाद!</p>
        </div>
      `
    };

    // ईमेल भेजें
    const info = await transporter.sendMail(mailOptions);
    console.log('ईमेल सफलतापूर्वक भेजा गया:', info.messageId);
    console.log('प्रिव्यू URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('ईमेल भेजने में त्रुटि:', error);
  }
}

// टेस्ट फंक्शन चलाएं
sendTestEmail();