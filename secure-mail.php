<?php
// सुरक्षित मेल सेंडिंग स्क्रिप्ट - White Wings Visa

// सुरक्षा हेडर्स
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CSRF प्रोटेक्शन
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die(json_encode(['success' => false, 'message' => 'CSRF टोकन अमान्य है']));
    }
}

// CSRF टोकन जनरेट करें
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// GoDaddy SMTP सेटिंग्स
$smtp_host = 'smtpout.secureserver.net';
$smtp_port = 465;
$smtp_username = 'mrunal@whitewingsvisa.com';
$smtp_password = 'YOUR_PASSWORD_HERE'; // अपना वास्तविक पासवर्ड यहां डालें
$smtp_from = 'mrunal@whitewingsvisa.com';
$smtp_from_name = 'White Wings Visa';

// फॉर्म सबमिशन प्रोसेस करें
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // इनपुट सैनिटाइज़ करें
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $visaType = filter_input(INPUT_POST, 'visaType', FILTER_SANITIZE_STRING);
    $destination = filter_input(INPUT_POST, 'destination', FILTER_SANITIZE_STRING);
    $notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_STRING);
    
    // वैलिडेशन
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'नाम आवश्यक है';
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'वैध ईमेल आवश्यक है';
    }
    
    if (empty($phone)) {
        $errors[] = 'फोन नंबर आवश्यक है';
    }
    
    // अगर एरर हैं तो उन्हें रिटर्न करें
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
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
                <p><strong>IP एड्रेस:</strong> " . $_SERVER['REMOTE_ADDR'] . "</p>
                <p><strong>ब्राउज़र:</strong> " . $_SERVER['HTTP_USER_AGENT'] . "</p>
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
        
        // सफलता रिस्पांस
        echo json_encode(['success' => true, 'message' => 'आपका संदेश सफलतापूर्वक भेज दिया गया है!']);
    } else {
        // एरर रिस्पांस
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'ईमेल भेजने में त्रुटि। कृपया बाद में पुन: प्रयास करें।']);
    }
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>मेल सेंडिंग टेस्ट</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .success { background-color: #d1fae5; border: 1px solid #a7f3d0; color: #065f46; padding: 10px; }
        .error { background-color: #fee2e2; border: 1px solid #fecaca; color: #b91c1c; padding: 10px; }
    </style>
</head>
<body>
    <h1>सुरक्षित मेल सेंडिंग टेस्ट</h1>
    
    <div id="result"></div>
    
    <form id="testForm" method="post">
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        
        <div>
            <label for="name">नाम:</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div>
            <label for="email">ईमेल:</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div>
            <label for="phone">फोन:</label>
            <input type="tel" id="phone" name="phone" required>
        </div>
        
        <div>
            <label for="visaType">वीज़ा प्रकार:</label>
            <select id="visaType" name="visaType">
                <option value="Student">स्टूडेंट वीज़ा</option>
                <option value="Tourist">टूरिस्ट वीज़ा</option>
                <option value="Work">वर्क वीज़ा</option>
            </select>
        </div>
        
        <div>
            <label for="destination">गंतव्य:</label>
            <input type="text" id="destination" name="destination">
        </div>
        
        <div>
            <label for="notes">नोट्स:</label>
            <textarea id="notes" name="notes"></textarea>
        </div>
        
        <div>
            <button type="submit">टेस्ट ईमेल भेजें</button>
        </div>
    </form>
    
    <script>
        document.getElementById('testForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const resultDiv = document.getElementById('result');
            
            try {
                const response = await fetch('secure-mail.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    resultDiv.className = 'success';
                    resultDiv.textContent = result.message;
                } else {
                    resultDiv.className = 'error';
                    resultDiv.textContent = result.message;
                }
            } catch (error) {
                resultDiv.className = 'error';
                resultDiv.textContent = 'एक त्रुटि हुई। कृपया पुन: प्रयास करें।';
                console.error(error);
            }
        });
    </script>
</body>
</html>