<?php
// Quick setup script for White Wings email integration
echo "<h2>White Wings Email Setup</h2>";

// Check PHP mail function
if (function_exists('mail')) {
    echo "✅ PHP mail() function is available<br>";
} else {
    echo "❌ PHP mail() function is NOT available<br>";
}

// Test basic email
$test_email = 'mrunal@whitewingsvisa.com';
$subject = 'Setup Test - White Wings';
$message = 'Email integration test from ' . $_SERVER['HTTP_HOST'] . ' at ' . date('Y-m-d H:i:s');
$headers = 'From: mrunal@whitewingsvisa.com';

echo "<br><strong>Testing email to: $test_email</strong><br>";

if (mail($test_email, $subject, $message, $headers)) {
    echo "✅ Basic email sent successfully!<br>";
    echo "Check your inbox at mrunal@whitewingsvisa.com<br>";
} else {
    echo "❌ Email sending failed<br>";
    echo "Contact your hosting provider to enable mail() function<br>";
}

// Create required directories
$dirs = ['uploads', 'logs', 'temp'];
foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        if (mkdir($dir, 0755, true)) {
            echo "✅ Created directory: $dir<br>";
        } else {
            echo "❌ Failed to create directory: $dir<br>";
        }
    } else {
        echo "✅ Directory exists: $dir<br>";
    }
}

echo "<br><strong>Next Steps:</strong><br>";
echo "1. Update email password in email-config.php<br>";
echo "2. Test contact form on your website<br>";
echo "3. Check spam folder if emails don't arrive<br>";
echo "4. Delete this file after testing<br>";
?>