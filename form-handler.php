<?php
// Enhanced Form Handler for White Wings Visa
// Handles all form submissions with proper validation and spam protection

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS headers for AJAX requests
header('Access-Control-Allow-Origin: https://whitewingsvisa.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$config = [
    'email_to' => 'mrunal@whitewingsvisa.com',
    'email_from' => 'noreply@whitewingsvisa.com',
    'smtp_host' => 'smtp.gmail.com', // Update with your SMTP
    'smtp_port' => 587,
    'smtp_username' => 'mrunal@whitewingsvisa.com',
    'smtp_password' => 'your_app_password', // Use App Password
    'max_file_size' => 10 * 1024 * 1024, // 10MB
    'allowed_extensions' => ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
    'honeypot_field' => 'website', // Hidden field for spam detection
    'rate_limit' => 5, // Max submissions per IP per hour
];

// Rate limiting
session_start();
$ip = $_SERVER['REMOTE_ADDR'];
$current_time = time();
$rate_key = "rate_limit_" . md5($ip);

if (!isset($_SESSION[$rate_key])) {
    $_SESSION[$rate_key] = [];
}

// Clean old entries
$_SESSION[$rate_key] = array_filter($_SESSION[$rate_key], function($time) use ($current_time) {
    return ($current_time - $time) < 3600; // 1 hour
});

if (count($_SESSION[$rate_key]) >= $config['rate_limit']) {
    http_response_code(429);
    die(json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']));
}

// Add current request
$_SESSION[$rate_key][] = $current_time;

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Method not allowed']));
}

// Spam protection - Honeypot
if (!empty($_POST[$config['honeypot_field']])) {
    // Spam detected
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Spam detected']));
}

// Input validation and sanitization
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validate_phone($phone) {
    return preg_match('/^[\+]?[0-9\s\-\(\)]{10,15}$/', $phone);
}

// Required fields validation
$required_fields = ['name', 'email', 'phone'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

// Email validation
if (!empty($_POST['email']) && !validate_email($_POST['email'])) {
    $errors[] = 'Invalid email format';
}

// Phone validation
if (!empty($_POST['phone']) && !validate_phone($_POST['phone'])) {
    $errors[] = 'Invalid phone number format';
}

// If there are validation errors
if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => implode(', ', $errors)]));
}

// Sanitize all inputs
$form_data = [];
foreach ($_POST as $key => $value) {
    if ($key !== $config['honeypot_field']) {
        $form_data[$key] = sanitize_input($value);
    }
}

// Handle file uploads
$uploaded_files = [];
if (!empty($_FILES)) {
    foreach ($_FILES as $field_name => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            // Validate file size
            if ($file['size'] > $config['max_file_size']) {
                $errors[] = 'File too large. Maximum size is 10MB.';
                continue;
            }
            
            // Validate file extension
            $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($file_extension, $config['allowed_extensions'])) {
                $errors[] = 'Invalid file type. Allowed: ' . implode(', ', $config['allowed_extensions']);
                continue;
            }
            
            // Generate secure filename
            $secure_filename = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file['name']);
            $upload_path = 'uploads/' . $secure_filename;
            
            // Create uploads directory if it doesn't exist
            if (!is_dir('uploads')) {
                mkdir('uploads', 0755, true);
            }
            
            if (move_uploaded_file($file['tmp_name'], $upload_path)) {
                $uploaded_files[] = [
                    'original_name' => $file['name'],
                    'secure_name' => $secure_filename,
                    'path' => $upload_path,
                    'size' => $file['size']
                ];
            }
        }
    }
}

// If file upload errors
if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => implode(', ', $errors)]));
}

// Prepare email content
$subject = isset($form_data['_subject']) ? $form_data['_subject'] : 'New Form Submission - White Wings Visa';
$form_type = isset($form_data['form_type']) ? $form_data['form_type'] : 'General Contact';

$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e40af; }
        .value { margin-left: 10px; }
        .files { background: #f8f9fa; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class='header'>
        <h2>🎯 New {$form_type} Submission</h2>
        <p>White Wings Visa Consultancy</p>
    </div>
    <div class='content'>
        <h3>📋 Form Details:</h3>
";

foreach ($form_data as $key => $value) {
    if (!in_array($key, ['_subject', '_next', '_captcha', 'form_type']) && !empty($value)) {
        $label = ucwords(str_replace('_', ' ', $key));
        $email_body .= "<div class='field'><span class='label'>{$label}:</span><span class='value'>{$value}</span></div>";
    }
}

if (!empty($uploaded_files)) {
    $email_body .= "<div class='files'><h4>📎 Uploaded Files:</h4>";
    foreach ($uploaded_files as $file) {
        $email_body .= "<p>• {$file['original_name']} (" . round($file['size']/1024, 2) . " KB)</p>";
    }
    $email_body .= "</div>";
}

$email_body .= "
        <hr>
        <p><strong>📅 Submitted:</strong> " . date('Y-m-d H:i:s') . "</p>
        <p><strong>🌐 IP Address:</strong> {$ip}</p>
        <p><strong>🔗 User Agent:</strong> " . $_SERVER['HTTP_USER_AGENT'] . "</p>
    </div>
</body>
</html>
";

// Send email using PHPMailer (recommended) or mail() function
if (function_exists('mail')) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: White Wings Visa <{$config['email_from']}>" . "\r\n";
    $headers .= "Reply-To: {$form_data['email']}" . "\r\n";
    
    $mail_sent = mail($config['email_to'], $subject, $email_body, $headers);
    
    if ($mail_sent) {
        // Send auto-reply to user
        $auto_reply_subject = "Thank you for contacting White Wings Visa";
        $auto_reply_body = "
        <html>
        <body style='font-family: Arial, sans-serif;'>
            <h2 style='color: #1e40af;'>Thank You for Contacting White Wings Visa!</h2>
            <p>Dear {$form_data['name']},</p>
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
        
        $auto_reply_headers = "MIME-Version: 1.0" . "\r\n";
        $auto_reply_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $auto_reply_headers .= "From: White Wings Visa <{$config['email_from']}>" . "\r\n";
        
        mail($form_data['email'], $auto_reply_subject, $auto_reply_body, $auto_reply_headers);
        
        // Success response
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you! Your message has been sent successfully.',
            'redirect' => isset($form_data['_next']) ? $form_data['_next'] : '/thank-you.html'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
    }
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail function not available.']);
}
?>
