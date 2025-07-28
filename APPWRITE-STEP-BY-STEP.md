# 🚀 APPWRITE SETUP - STEP BY STEP

## STEP 1: Login to Appwrite
1. Open browser
2. Go to: **https://cloud.appwrite.io/console**
3. Login with your email/password

## STEP 2: Find Your Database
1. Click **"Databases"** in left sidebar
2. You will see database: **68878d4300198706e05e**
3. Click on it

## STEP 3: Find Your Collection
1. You will see collection: **68878d98002e0e623b25**
2. Click on it

## STEP 4: Add Attributes (Fields)
Click **"Create Attribute"** button and add these 8 fields:

### Field 1: name
- Type: **String**
- Attribute ID: **name**
- Size: **100**
- Required: **✅ Yes**
- Click **"Create"**

### Field 2: email
- Type: **String**
- Attribute ID: **email**
- Size: **100**
- Required: **✅ Yes**
- Click **"Create"**

### Field 3: phone
- Type: **String**
- Attribute ID: **phone**
- Size: **20**
- Required: **✅ Yes**
- Click **"Create"**

### Field 4: message
- Type: **String**
- Attribute ID: **message**
- Size: **2000**
- Required: **✅ Yes**
- Click **"Create"**

### Field 5: formType
- Type: **String**
- Attribute ID: **formType**
- Size: **50**
- Required: **❌ No**
- Click **"Create"**

### Field 6: visaType
- Type: **String**
- Attribute ID: **visaType**
- Size: **100**
- Required: **❌ No**
- Click **"Create"**

### Field 7: destination
- Type: **String**
- Attribute ID: **destination**
- Size: **100**
- Required: **❌ No**
- Click **"Create"**

### Field 8: submittedAt
- Type: **String**
- Attribute ID: **submittedAt**
- Size: **50**
- Required: **✅ Yes**
- Click **"Create"**

## STEP 5: Set Permissions
1. Click **"Settings"** tab
2. Click **"Permissions"**
3. Click **"Add Role"**
4. Select **"Any"** from dropdown
5. Check these boxes:
   - ✅ **Create**
   - ✅ **Read**
6. Click **"Update"**

## STEP 6: Test Forms
1. Go to your website
2. Fill any contact form
3. Click submit
4. Check Appwrite console for data

## ⚠️ IMPORTANT:
- Add fields ONE BY ONE
- Wait for each field to be created
- **Attribute ID** must be exact (lowercase)
- Don't skip permissions step

**Complete all steps and test!** 🎯