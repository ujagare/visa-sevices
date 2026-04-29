// Enhanced Vercel Serverless Function for All Forms
// White Wings Visa Consultancy - Universal Email Handler with Resend ONLY

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Received request body:", req.body);

    const formData = req.body;
    const {
      firstName,
      lastName,
      name,
      email,
      phone,
      countryCode,
      subject,
      message,
      formType,
      formId,
      timestamp,
      // Additional fields for different forms
      destination,
      visaType,
      experience,
      qualification,
      travelDate,
      duration,
      purpose,
      budget,
    } = formData;

    // Basic validation
    if (!email) {
      console.log("Validation failed: Email missing");
      return res.status(400).json({
        error: "Email is required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed: Invalid email format");
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Prepare email content based on form type
    const fullName =
      firstName && lastName
        ? `${firstName} ${lastName}`
        : name || "Website Visitor";
    const fullPhone = phone
      ? `${countryCode || "+91"} ${phone}`
      : "Not provided";
    const formTypeDisplay = formType || "General Inquiry";
    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    console.log("Processing form:", { formTypeDisplay, fullName, email });

    // Create comprehensive email template
    const emailSubject = `${formTypeDisplay} - ${fullName} - White Wings Visa`;

    const emailHTML = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">White Wings Visa Consultancy</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${formTypeDisplay}</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px; background: white;">
          <!-- Contact Information -->
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555; width: 140px;">Full Name:</td>
                <td style="padding: 8px 0; color: #333;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${fullPhone}" style="color: #667eea; text-decoration: none;">${fullPhone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555;">Subject:</td>
                <td style="padding: 8px 0; color: #333;">${subject || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555;">Form Type:</td>
                <td style="padding: 8px 0; color: #333;">${formTypeDisplay}</td>
              </tr>
            </table>
          </div>

          <!-- Message -->
          ${
            message
              ? `
          <div style="background: #fff; padding: 25px; border: 2px solid #e5e7eb; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Message:</h3>
            <p style="color: #555; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          `
              : ""
          }

          <!-- Quick Actions -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; text-align: center;">
            <h3 style="color: white; margin: 0 0 20px 0; font-size: 18px;">Quick Actions</h3>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
              <a href="mailto:${email}" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 500; display: inline-block;">📧 Reply to Client</a>
              <a href="tel:${fullPhone}" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 500; display: inline-block;">📞 Call Client</a>
              <a href="https://wa.me/${fullPhone.replace(/\D/g, "")}" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 500; display: inline-block;">💬 WhatsApp</a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            <strong>Submission Details:</strong><br>
            Form ID: ${formId || "Unknown"} | Time: ${submissionTime}<br>
            Sent from White Wings Visa Website
          </p>
        </div>
      </div>
    `;

    // Send email using Resend API ONLY
    if (!process.env.RESEND_API_KEY) {
      console.log("Error: RESEND_API_KEY not found in environment variables");
      return res.status(500).json({
        error: "Email service not configured. Please contact administrator.",
        message: "RESEND_API_KEY missing",
      });
    }

    console.log("Sending email via Resend API...");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "White Wings Visa <noreply@whitewingsvisa.com>",
        to: ["mrunal@whitewingsvisa.com"],
        subject: emailSubject,
        html: emailHTML,
        // Add reply-to for direct client communication
        reply_to: email,
      }),
    });

    const resendResult = await resendResponse.json();
    console.log("Resend API response:", resendResult);

    if (resendResponse.ok) {
      console.log("Email sent successfully via Resend");
      return res.status(200).json({
        success: true,
        message: "Email sent successfully via Resend API!",
        id: resendResult.id,
        formType: formTypeDisplay,
      });
    } else {
      console.error("Resend API Error:", resendResult);
      return res.status(500).json({
        error: "Failed to send email via Resend API",
        details: resendResult,
        fallback: {
          email: "mrunal@whitewingsvisa.com",
          phone: "+91 9130448831",
        },
      });
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
      fallback: {
        email: "mrunal@whitewingsvisa.com",
        phone: "+91 9130448831",
      },
    });
  }
}
