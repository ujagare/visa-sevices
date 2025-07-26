# Email Setup Instructions for White Wings Visa Website

This document explains how to fix the contact form email sending issue on the White Wings Visa website.

## What Was Fixed

1. Created a new PHP mail script (`send-mail.php`) to handle form submissions
2. Updated the contact form to use this script instead of FormSubmit.co
3. Created a thank-you page that appears after successful form submission
4. Updated the JavaScript validation to work with the new PHP script
5. Added test files to verify email functionality

## How to Test the Email Functionality

1. Upload all files to your web server
2. Open `test-form.html` in your browser
3. Fill out the form and submit it
4. Check if you receive the test email at mrunal@whitewingsvisa.com

## Troubleshooting

If emails are still not being sent, try the following:

1. Check if PHP mail function is working by accessing `test-mail.php` in your browser
2. Make sure your web hosting supports PHP mail function
3. Check if your server has proper mail configuration
4. Contact your hosting provider to ensure outgoing emails are not blocked

## Alternative Solutions

If the PHP mail function doesn't work on your server, you have these alternatives:

### Option 1: Use SMTP with PHPMailer

1. Install PHPMailer library
2. Update `send-mail.php` to use SMTP instead of mail() function
3. Configure with your SMTP server details

### Option 2: Continue with FormSubmit.co

If you prefer to use FormSubmit.co:
1. Revert the form action to: `action="https://formsubmit.co/mrunal@whitewingsvisa.com"`
2. Make sure you've activated your FormSubmit.co account by clicking the activation link they sent to your email

### Option 3: Use a different form service

Consider using other form services like:
- Formspree.io
- Netlify Forms
- Google Forms embedded in your website

## Need Further Help?

If you continue to experience issues, please contact a web developer for assistance with your specific hosting environment.