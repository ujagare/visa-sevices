<?php
// Simple mail sender for White Wings Visa contact form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $visaType = isset($_POST['visaType']) ? htmlspecialchars(trim($_POST['visaType'])) : '';
    $destination = isset($_POST['destination']) ? htmlspecialchars(trim($_POST['destination'])) : '';
    $notes = isset($_POST['notes']) ? htmlspecialchars(trim($_POST['notes'])) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Please fill all required fields']);
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Set email recipient
    $to = 'mrunal@whitewingsvisa.com';
    
    // Set email subject
    $subject = "New Visa Application Request from $name";
    
    // Build email message
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e40af; color: white; padding: 15px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Visa Application Request</h2>
            </div>
            <div class='content'>
                <div class='field'><span class='label'>Name:</span> $name</div>
                <div class='field'><span class='label'>Email:</span> $email</div>
                <div class='field'><span class='label'>Phone:</span> $phone</div>
                <div class='field'><span class='label'>Visa Type:</span> $visaType</div>
                <div class='field'><span class='label'>Destination:</span> $destination</div>
                <div class='field'><span class='label'>Notes:</span> $notes</div>
                <hr>
                <p>This message was sent from the contact form on whitewingsvisa.com</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Set email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    $mailSent = mail($to, $subject, $message, $headers);
    
    if ($mailSent) {
        // Send auto-reply to user
        $autoReplySubject = "Thank you for contacting White Wings Visa";
        $autoReplyMessage = "
        <html>
        <body style='font-family: Arial, sans-serif;'>
            <h2 style='color: #1e40af;'>Thank You for Contacting White Wings Visa!</h2>
            <p>Dear $name,</p>
            <p>We have received your inquiry and our visa experts will review your information.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
                <li>Our team will review your application within 24 hours</li>
                <li>We'll contact you via phone or email with next steps</li>
                <li>For urgent queries, call us at +91 9130448831</li>
            </ul>
            <p>Best regards,<br>White Wings Visa Consultancy Team</p>
        </body>
        </html>
        ";
        
        $autoReplyHeaders = "MIME-Version: 1.0\r\n";
        $autoReplyHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
        $autoReplyHeaders .= "From: White Wings Visa <noreply@whitewingsvisa.com>\r\n";
        
        mail($email, $autoReplySubject, $autoReplyMessage, $autoReplyHeaders);
        
        echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again or contact us directly.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>