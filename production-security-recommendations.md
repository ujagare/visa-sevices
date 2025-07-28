# EmailJS Production Security Recommendations

## 🚨 CRITICAL SECURITY ISSUES

### Current Problems:
1. **Public Key Exposure** - EmailJS credentials visible in client-side code
2. **No Rate Limiting** - Vulnerable to spam attacks
3. **No Domain Restrictions** - Can be used from any website
4. **No Input Sanitization** - Potential XSS vulnerabilities

## 🛡️ IMMEDIATE SECURITY FIXES NEEDED

### 1. Server-Side Form Processing (RECOMMENDED)
Replace EmailJS with secure server-side solution:

```php
// contact-handler.php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://whitewingsvisa.com');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

// Rate limiting
session_start();
$now = time();
$submissions = $_SESSION['submissions'] ?? [];
$submissions = array_filter($submissions, fn($time) => $now - $time < 300); // 5 min window

if (count($submissions) >= 3) {
    http_response_code(429);
    exit(json_encode(['error' => 'Rate limit exceeded']));
}

$submissions[] = $now;
$_SESSION['submissions'] = $submissions;

// Validate and sanitize input
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);

if (!$name || !$email || !$phone) {
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid input']));
}

// Send email securely
$to = 'mrunal@whitewingsvisa.com';
$subject = 'New Contact Form Submission';
$message = "Name: $name\nEmail: $email\nPhone: $phone";
$headers = "From: noreply@whitewingsvisa.com\r\nReply-To: $email";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
```

### 2. EmailJS Security Hardening (TEMPORARY)
If you must continue using EmailJS:

#### A. Domain Restrictions in EmailJS Dashboard:
1. Login to EmailJS dashboard
2. Go to Integration settings
3. Add domain restrictions: `whitewingsvisa.com`
4. Enable reCAPTCHA integration

#### B. Environment Variables:
```javascript
// Use environment-specific configs
const CONFIG = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY || 'fallback-key',
    serviceId: process.env.EMAILJS_SERVICE_ID || 'fallback-service',
    templateId: process.env.EMAILJS_TEMPLATE_ID || 'fallback-template'
};
```

#### C. Implement the Secure Config:
Replace current EmailJS files with `secure-emailjs-config.js`

### 3. Additional Security Measures

#### A. Content Security Policy (.htaccess):
```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com; connect-src 'self' https://api.emailjs.com;"
```

#### B. Form Honeypot (Anti-Bot):
```html
<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
```

#### C. CSRF Protection:
```javascript
// Generate CSRF token
const csrfToken = btoa(Math.random().toString()).substr(10, 10);
sessionStorage.setItem('csrf_token', csrfToken);
```

## 🚀 PRODUCTION DEPLOYMENT STEPS

### Immediate Actions:
1. ✅ Implement server-side form processing
2. ✅ Add domain restrictions in EmailJS dashboard
3. ✅ Enable reCAPTCHA on all forms
4. ✅ Add rate limiting
5. ✅ Implement input sanitization

### Long-term Solutions:
1. **Move to server-side email processing**
2. **Implement proper authentication**
3. **Add database logging for form submissions**
4. **Set up monitoring and alerts**

## ⚠️ CURRENT RISK LEVEL: HIGH

**Recommendation:** Do NOT deploy to production with current EmailJS setup. Implement server-side processing first.

## 📞 Emergency Fallback
If EmailJS fails, forms automatically redirect to WhatsApp - this is good backup but not primary solution.

## 🔍 Security Checklist Before Production:
- [ ] Server-side form processing implemented
- [ ] Domain restrictions enabled
- [ ] Rate limiting active
- [ ] Input validation/sanitization
- [ ] CSRF protection
- [ ] reCAPTCHA integration
- [ ] Security headers configured
- [ ] Error handling implemented
- [ ] Monitoring/logging setup