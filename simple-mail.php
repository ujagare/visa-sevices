<?php
// Simple mail handler without complex features
if ($_POST) {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $visaType = $_POST['visaType'] ?? '';
    $destination = $_POST['destination'] ?? '';
    
    if ($name && $email && $phone) {
        $to = 'mrunal@whitewingsvisa.com';
        $subject = "New Visa Inquiry - $visaType";
        $message = "
        Name: $name
        Email: $email
        Phone: $phone
        Visa Type: $visaType
        Destination: $destination
        Time: " . date('Y-m-d H:i:s') . "
        ";
        
        $headers = "From: mrunal@whitewingsvisa.com\r\nReply-To: $email";
        
        if (mail($to, $subject, $message, $headers)) {
            echo "success";
        } else {
            echo "error";
        }
    } else {
        echo "missing_fields";
    }
} else {
    echo "no_data";
}
?>