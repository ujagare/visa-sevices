<?php
// Test if PHP mail function is working
$to = "mrunal@whitewingsvisa.com";
$subject = "Test Email from White Wings Website";
$message = "This is a test email to check if the PHP mail function is working correctly.";
$headers = "From: test@whitewingsvisa.com";

if(mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully!";
} else {
    echo "Failed to send test email. Please check your server configuration.";
}
?>