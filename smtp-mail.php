<?php
// SMTP मेल सेंडिंग स्क्रिप्ट

// SMTP सेटिंग्स
$smtp_host = 'mail.whitewingsvisa.com'; // अपने SMTP सर्वर का होस्ट
$smtp_port = 587;                       // SMTP पोर्ट (आमतौर पर 587 या 465)
$smtp_username = 'mrunal@whitewingsvisa.com'; // SMTP यूजरनेम
$smtp_password = 'your_password_here';  // SMTP पासवर्ड
$smtp_from = 'mrunal@whitewingsvisa.com'; // भेजने वाला ईमेल
$smtp_from_name = 'White Wings Visa';   // भेजने वाले का नाम

// फॉर्म डेटा प्राप्त करें
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $visaType = isset($_POST['visaType']) ? htmlspecialchars(trim($_POST['visaType'])) : '';
    $destination = isset($_POST['destination']) ? htmlspecialchars(trim($_POST['destination'])) : '';
    $notes = isset($_POST['notes']) ? htmlspecialchars(trim($_POST['notes'])) : '';
    
    // आवश्यक फील्ड्स की जांच करें
    if (empty($name) || empty($email) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'कृपया सभी आवश्यक फील्ड भरें']);
        exit;
    }
    
    // ईमेल फॉर्मेट की जांच करें
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'अमान्य ईमेल फॉर्मेट']);
        exit;
    }
    
    // ईमेल हेडर्स
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$smtp_from_name} <{$smtp_from}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // SMTP हेडर्स
    ini_set("SMTP", $smtp_host);
    ini_set("smtp_port", $smtp_port);
    ini_set("sendmail_from", $smtp_from);
    
    // ईमेल विषय
    $subject = "नया वीज़ा आवेदन अनुरोध: {$name}";
    
    // ईमेल संदेश
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
                <h2>नया वीज़ा आवेदन अनुरोध</h2>
            </div>
            <div class='content'>
                <div class='field'><span class='label'>नाम:</span> {$name}</div>
                <div class='field'><span class='label'>ईमेल:</span> {$email}</div>
                <div class='field'><span class='label'>फोन:</span> {$phone}</div>
                <div class='field'><span class='label'>वीज़ा प्रकार:</span> {$visaType}</div>
                <div class='field'><span class='label'>गंतव्य:</span> {$destination}</div>
                <div class='field'><span class='label'>नोट्स:</span> {$notes}</div>
                <hr>
                <p>यह संदेश whitewingsvisa.com के कॉन्टैक्ट फॉर्म से भेजा गया था</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // PHP mail() फंक्शन के साथ SMTP का उपयोग करके ईमेल भेजें
    $mail_sent = mail($smtp_username, $subject, $message, $headers);
    
    if ($mail_sent) {
        // ऑटो-रिप्लाई भेजें
        $auto_reply_subject = "White Wings Visa Consultancy से धन्यवाद";
        $auto_reply_message = "
        <html>
        <body style='font-family: Arial, sans-serif;'>
            <h2 style='color: #1e40af;'>White Wings Visa से संपर्क करने के लिए धन्यवाद!</h2>
            <p>प्रिय {$name},</p>
            <p>हमने आपका अनुरोध प्राप्त कर लिया है और हमारे वीज़ा विशेषज्ञ आपकी जानकारी की समीक्षा करेंगे।</p>
            <p><strong>अगले कदम:</strong></p>
            <ul>
                <li>हमारी टीम 24 घंटे के भीतर आपके आवेदन की समीक्षा करेगी</li>
                <li>हम फोन या ईमेल के माध्यम से आपसे संपर्क करेंगे</li>
                <li>तत्काल प्रश्नों के लिए, हमें +91 9130448831 पर कॉल करें</li>
            </ul>
            <p>सादर,<br>White Wings Visa Consultancy टीम</p>
        </body>
        </html>
        ";
        
        $auto_reply_headers = "MIME-Version: 1.0\r\n";
        $auto_reply_headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $auto_reply_headers .= "From: {$smtp_from_name} <{$smtp_from}>\r\n";
        
        mail($email, $auto_reply_subject, $auto_reply_message, $auto_reply_headers);
        
        echo json_encode(['success' => true, 'message' => 'आपका संदेश सफलतापूर्वक भेज दिया गया है!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'ईमेल भेजने में त्रुटि। कृपया बाद में पुन: प्रयास करें।']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'अमान्य अनुरोध विधि']);
}
?>