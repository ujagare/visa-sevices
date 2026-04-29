<?php
// Simple mail test for mrunal@whitewingsvisa.com
$to = 'mrunal@whitewingsvisa.com';
$subject = 'Test Email - White Wings Website';
$message = '
<html>
<body style="font-family: Arial, sans-serif;">
    <h2>✅ Email Test Successful!</h2>
    <p>This is a test email from your White Wings Visa website.</p>
    <p><strong>Time:</strong> ' . date('Y-m-d H:i:s') . '</p>
    <p><strong>Server:</strong> ' . $_SERVER['HTTP_HOST'] . '</p>
    <p>If you receive this email, your mail integration is working correctly!</p>
</body>
</html>';

$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: White Wings <mrunal@whitewingsvisa.com>',
    'X-Mailer: PHP/' . phpversion()
);

if (mail($to, $subject, $message, implode("\r\n", $headers))) {
    echo "✅ Test email sent successfully to mrunal@whitewingsvisa.com";
} else {
    echo "❌ Failed to send test email. Check server configuration.";
}
?>