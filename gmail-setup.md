# 📧 Gmail SMTP Setup

## Gmail App Password Required

### Steps:
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification (if not enabled)
3. Go to App passwords
4. Generate password for "Mail"
5. Copy 16-character password

### Update .env file:
```
EMAIL_USER=ujagare.sunny@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Then restart backend:
```bash
npm start
```

### Gmail SMTP Benefits:
- ✅ Guaranteed to work
- ✅ No authentication issues
- ✅ Reliable delivery
- ✅ Easy setup

**Get Gmail app password and update .env file!** 📧