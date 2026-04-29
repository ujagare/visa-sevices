# Vercel Deployment Guide - White Wings Visa Website

## 🚀 Quick Deployment Steps

### 1. **Install Vercel CLI** (Optional)

```bash
npm install -g vercel
```

### 2. **Deploy via GitHub (Recommended)**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub account
3. Click **"New Project"**
4. Import your GitHub repository: `ujagare/visa-sevices`
5. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
6. Click **"Deploy"**

### 3. **Environment Variables Setup**

After deployment, add these environment variables in Vercel Dashboard:

**Go to**: Project Settings → Environment Variables

#### **Option 1: Resend API (Recommended)**

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### **Option 2: EmailJS (Alternative)**

```
EMAILJS_SERVICE_ID = service_xxxxxxx
EMAILJS_TEMPLATE_ID = template_xxxxxxx
EMAILJS_PUBLIC_KEY = xxxxxxxxxxxxxxx
```

### 4. **Get API Keys**

#### **Resend API (Recommended)**

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Create API key
4. Add domain verification (optional for production)

#### **EmailJS (Alternative)**

1. Go to [emailjs.com](https://emailjs.com)
2. Create free account
3. Set up email service (Gmail/Outlook)
4. Create email template
5. Get Service ID, Template ID, and Public Key

### 5. **Custom Domain (Optional)**

1. In Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 📧 **Email Configuration**

### **Email Template Variables**

The contact form sends these variables:

- `firstName` - First name
- `lastName` - Last name
- `email` - Email address
- `phone` - Phone number
- `countryCode` - Country code (+91, +1, etc.)
- `subject` - Form subject
- `message` - Message content

### **Email Delivery Methods**

1. **Resend API** (Primary) - Professional email delivery
2. **EmailJS** (Fallback) - Free email service
3. **Formspree** (Final fallback) - Already configured

## 🔧 **Local Development**

```bash
# Install dependencies
npm install

# Start local development
vercel dev

# Or use Vercel CLI
npx vercel dev
```

## 📱 **Features Included**

✅ **Serverless Contact Form**  
✅ **Multiple Email Providers**  
✅ **Form Validation**  
✅ **Mobile Responsive**  
✅ **Professional Email Templates**  
✅ **Error Handling**  
✅ **Success/Thank You Page**

## 🌐 **Your Website URLs**

- **Vercel URL**: `https://visa-sevices.vercel.app`
- **Custom Domain**: Configure in Vercel Dashboard

## 📞 **Support**

If you need help with deployment:

- Email: mrunal@whitewingsvisa.com
- Phone: +91 9130448831

## 🔒 **Security Features**

- CORS protection
- Input validation
- Rate limiting (Vercel built-in)
- Environment variable protection
- XSS protection
