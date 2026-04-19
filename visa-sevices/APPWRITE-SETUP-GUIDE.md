# 🚀 APPWRITE SETUP GUIDE - WHITE WINGS VISA CONSULTANCY

## 📋 STEP-BY-STEP SETUP

### 1. **Create Appwrite Account**
- Go to: https://cloud.appwrite.io/
- Sign up with email
- Create new project: "White Wings Visa"
- Copy Project ID

### 2. **Create Database**
- Go to Databases → Create Database
- Name: `visa-forms`
- Database ID: `visa-forms`

### 3. **Create Collection**
- Inside database → Create Collection
- Name: `contacts`
- Collection ID: `contacts`

### 4. **Add Attributes (Fields)**
```
name          | String  | Required | Size: 100
email         | String  | Required | Size: 100
phone         | String  | Required | Size: 20
countryCode   | String  | Optional | Size: 10
message       | String  | Required | Size: 2000
formType      | String  | Optional | Size: 50
visaType      | String  | Optional | Size: 100
destination   | String  | Optional | Size: 100
submittedAt   | String  | Required | Size: 50
```

### 5. **Set Permissions**
- Collection Settings → Permissions
- Add Role: `any`
- Permissions: `create`, `read`

### 6. **Update Project ID**
- Copy your Project ID from Appwrite dashboard
- Update in `appwrite-config.js`:
```javascript
.setProject('YOUR_PROJECT_ID_HERE')
```

## 🔧 IMPLEMENTATION

### Add to HTML Files:
```html
<!-- Add before closing </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@13.0.1"></script>
<script src="appwrite-config.js"></script>
```

### Update Forms:
- Remove `action` and `method` attributes
- Keep form IDs and input names
- Forms will be handled by JavaScript

## ✅ BENEFITS

- ✅ **No server needed** - Cloud hosted
- ✅ **Real-time database** - Instant data storage
- ✅ **Built-in security** - Authentication & permissions
- ✅ **Free tier** - 75,000 requests/month
- ✅ **Dashboard** - View all submissions
- ✅ **No email issues** - Direct database storage

## 🎯 NEXT STEPS

1. Complete Appwrite setup
2. Update Project ID
3. Add scripts to HTML files
4. Test forms
5. View data in Appwrite dashboard

**Much simpler than Node.js backend!** 🚀