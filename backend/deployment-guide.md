# Node.js Backend Deployment Guide

## 📋 What You Need to Provide

### 1. Email Configuration
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-business-email@gmail.com
EMAIL_PASS=your-app-password  # NOT regular password
EMAIL_FROM=noreply@whitewingsvisa.com
ADMIN_EMAIL=mrunal@whitewingsvisa.com
```

**How to get Gmail App Password:**
1. Go to Google Account settings
2. Security → 2-Step Verification (enable if not enabled)
3. App passwords → Generate password for "Mail"
4. Use this 16-character password in EMAIL_PASS

### 2. Database Setup
**Option A: MongoDB Atlas (Recommended - Free)**
1. Go to mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/whitewings`

**Option B: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/whitewings
```

### 3. Server Details
- Hosting provider name
- Node.js version support
- Domain name
- SSL certificate status

## 🚀 Deployment Steps

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Environment Setup
```bash
cp .env.example .env
# Edit .env with your actual values
```

### Step 3: Test Locally
```bash
npm run dev
```

### Step 4: Production Deployment

**For VPS/Dedicated Server:**
```bash
# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start server.js --name "whitewings-api"
pm2 startup
pm2 save
```

**For Shared Hosting (cPanel):**
1. Upload backend folder to public_html/api/
2. Create Node.js app in cPanel
3. Set startup file to server.js
4. Install dependencies via terminal

### Step 5: Frontend Integration
Replace EmailJS scripts with:
```html
<script src="secure-form-handler.js"></script>
```

Update API URL in secure-form-handler.js:
```javascript
this.apiUrl = 'https://api.whitewingsvisa.com'; // Your actual API domain
```

## 🔧 Server Configuration

### Nginx Configuration (if using VPS):
```nginx
server {
    listen 80;
    server_name api.whitewingsvisa.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Apache .htaccess (for shared hosting):
```apache
RewriteEngine On
RewriteRule ^(.*)$ server.js [QSA,L]
```

## 📊 Admin Dashboard Access

Access admin panel at: `https://api.whitewingsvisa.com/api/admin/dashboard/stats`

### Available Endpoints:
- `GET /api/admin/contacts` - List all contacts
- `GET /api/admin/contacts/:id` - Get specific contact
- `PATCH /api/admin/contacts/:id/status` - Update contact status
- `GET /api/admin/dashboard/stats` - Dashboard statistics

## 🔒 Security Features Included

✅ Rate limiting (5 requests per 15 minutes)
✅ Input validation and sanitization
✅ CORS protection
✅ Helmet security headers
✅ MongoDB injection protection
✅ XSS protection
✅ Email confirmation to customers
✅ Admin notifications
✅ Database logging
✅ Reference number generation
✅ IP address tracking

## 📱 Testing

### Test Form Submission:
```bash
curl -X POST https://api.whitewingsvisa.com/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "email": "test@example.com",
    "phone": "9876543210",
    "message": "Test message",
    "formType": "contact"
  }'
```

### Health Check:
```bash
curl https://api.whitewingsvisa.com/health
```

## 🚨 Troubleshooting

### Common Issues:
1. **Email not sending**: Check Gmail app password and SMTP settings
2. **Database connection failed**: Verify MongoDB URI and network access
3. **CORS errors**: Update ALLOWED_ORIGINS in .env
4. **Rate limiting**: Clear localStorage or wait 15 minutes

### Logs:
```bash
# PM2 logs
pm2 logs whitewings-api

# Application logs
tail -f logs/app.log
```

## 📞 Next Steps

1. **Provide email credentials**
2. **Set up MongoDB database**
3. **Share hosting details**
4. **Test deployment**
5. **Update frontend forms**
6. **Go live!**

**Estimated Setup Time:** 2-3 hours
**Monthly Cost:** $0-10 (depending on hosting)