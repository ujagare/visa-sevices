# Email Setup Instructions for White Wings Visa Consultancy

## 1. GoDaddy Email Setup (Your Action Required)

### Step 1: Create Email Account
1. Log into your GoDaddy account
2. Go to "My Products" → "Email & Office"
3. If you don't have email hosting, purchase "Professional Email" for your domain
4. Create the email account: `mrunal@whitewingsvisa.com`
5. Set a strong password

### Step 2: Get SMTP Settings
GoDaddy will provide you with these settings:
- **SMTP Server:** `smtpout.secureserver.net`
- **Port:** `587` (TLS) or `465` (SSL)
- **Username:** `mrunal@whitewingsvisa.com`
- **Password:** [Your email password]
- **Security:** TLS/STARTTLS

### Step 3: Update Configuration
Edit the file `email-config.php` and update:
```php
'smtp_username' => 'mrunal@whitewingsvisa.com',
'smtp_password' => 'YOUR_ACTUAL_PASSWORD_HERE', // Replace this
```

## 2. Website Integration

### Files Created:
- ✅ `secure-mail.php` - Basic secure mail handler
- ✅ `enhanced-mail-handler.php` - Advanced handler with file uploads
- ✅ `email-config.php` - Configuration file (needs password update)

### Update Contact Form:
Your contact form in `contact.html` should use:
```html
<form action="enhanced-mail-handler.php" method="POST" enctype="multipart/form-data">
```

## 3. Security Features Implemented

### ✅ CSRF Protection
- Prevents cross-site request forgery attacks
- Validates form submissions with security tokens

### ✅ Rate Limiting
- Prevents spam submissions
- 1-minute cooldown between submissions per IP

### ✅ Input Validation
- Sanitizes all user inputs
- Validates email addresses
- Checks required fields

### ✅ File Upload Security
- Validates file types (PDF, JPG, PNG only)
- Limits file size (10MB max)
- Secure file naming and storage

## 4. Email Features

### ✅ Professional Templates
- Branded email design
- Urgent request highlighting
- Structured data presentation
- Mobile-responsive layout

### ✅ Auto-Reply System
- Immediate confirmation to customers
- Professional welcome message
- Next steps information
- WhatsApp contact option

### ✅ Logging System
- Tracks all inquiries
- Stores submission details
- Monthly log organization

## 5. Testing Steps

### Before Going Live:
1. Update `email-config.php` with your actual password
2. Test form submission on your server
3. Check if emails are received at `mrunal@whitewingsvisa.com`
4. Verify auto-reply emails are sent to customers
5. Test file upload functionality

### Test Email:
```
Name: Test User
Email: test@example.com
Phone: +91 9876543210
Visa Type: Student Visa
Destination: USA
```

## 6. Server Requirements

### PHP Extensions Needed:
- `mail()` function enabled
- `filter_var()` for validation
- `move_uploaded_file()` for uploads
- Session support

### Folder Permissions:
```
chmod 755 uploads/
chmod 755 logs/
chmod 755 temp/
```

## 7. Alternative: PHPMailer (Recommended)

For better email delivery, consider using PHPMailer:

```bash
composer require phpmailer/phpmailer
```

This provides:
- Better SMTP authentication
- Enhanced security
- Improved delivery rates
- Better error handling

## 8. Monitoring & Maintenance

### Regular Tasks:
- Check `logs/` folder for inquiries
- Monitor `uploads/` folder size
- Clean old temporary files
- Update email password if changed

### Email Deliverability:
- Set up SPF record in DNS
- Configure DKIM if available
- Monitor spam folder initially

## 9. Backup Strategy

### Important Files to Backup:
- `logs/` - All inquiry logs
- `uploads/` - Customer documents
- `email-config.php` - Configuration
- Database (if you add one later)

## 10. Support

If you need help with:
- GoDaddy email setup: Contact GoDaddy support
- PHP configuration: Contact your hosting provider
- Code modifications: Technical support available

---

**Next Steps:**
1. Set up email account on GoDaddy
2. Update `email-config.php` with your password
3. Upload files to your server
4. Test the contact form
5. Monitor email delivery

**Security Note:** Never commit your actual email password to version control. Keep `email-config.php` secure and backed up separately.