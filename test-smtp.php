<?php
// SMTP टेस्ट स्क्रिप्ट

// SMTP सेटिंग्स
$smtp_host = 'mail.whitewingsvisa.com'; // अपने SMTP सर्वर का होस्ट
$smtp_port = 587;                       // SMTP पोर्ट (आमतौर पर 587 या 465)
$smtp_username = 'mrunal@whitewingsvisa.com'; // SMTP यूजरनेम
$smtp_password = 'your_password_here';  // SMTP पासवर्ड
$smtp_from = 'mrunal@whitewingsvisa.com'; // भेजने वाला ईमेल
$smtp_from_name = 'White Wings Visa';   // भेजने वाले का नाम

// SMTP हेडर्स सेट करें
ini_set("SMTP", $smtp_host);
ini_set("smtp_port", $smtp_port);
ini_set("sendmail_from", $smtp_from);

// ईमेल हेडर्स
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$smtp_from_name} <{$smtp_from}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// ईमेल विषय और संदेश
$subject = "SMTP टेस्ट ईमेल";
$message = "
<html>
<body style='font-family: Arial, sans-serif;'>
    <h2 style='color: #1e40af;'>SMTP टेस्ट सफल!</h2>
    <p>यह एक टेस्ट ईमेल है। अगर आपको यह मिल रहा है, तो आपका SMTP सेटअप सही काम कर रहा है।</p>
    <p>सर्वर विवरण:</p>
    <ul>
        <li>होस्ट: {$smtp_host}</li>
        <li>पोर्ट: {$smtp_port}</li>
        <li>यूजर: {$smtp_username}</li>
    </ul>
    <p>धन्यवाद!</p>
</body>
</html>
";

// ईमेल भेजें
if(mail($smtp_username, $subject, $message, $headers)) {
    echo "<h2 style='color:green'>टेस्ट ईमेल सफलतापूर्वक भेजा गया!</h2>";
    echo "<p>ईमेल {$smtp_username} पर भेजा गया था। कृपया अपना इनबॉक्स चेक करें।</p>";
} else {
    echo "<h2 style='color:red'>टेस्ट ईमेल भेजने में त्रुटि!</h2>";
    echo "<p>कृपया अपनी SMTP सेटिंग्स की जांच करें और पुन: प्रयास करें।</p>";
    
    echo "<h3>डिबग जानकारी:</h3>";
    echo "<pre>";
    echo "PHP वर्जन: " . phpversion() . "\n";
    echo "mail.log: " . ini_get('mail.log') . "\n";
    echo "SMTP: " . ini_get('SMTP') . "\n";
    echo "smtp_port: " . ini_get('smtp_port') . "\n";
    echo "sendmail_path: " . ini_get('sendmail_path') . "\n";
    echo "</pre>";
}
?>