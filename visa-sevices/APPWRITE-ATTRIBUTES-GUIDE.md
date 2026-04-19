# 📋 APPWRITE ATTRIBUTES SETUP GUIDE

## 🎯 Step-by-Step Instructions:

### 1. **Go to Appwrite Console**
- Open: https://cloud.appwrite.io/console
- Login to your account

### 2. **Navigate to Your Collection**
- Click "Databases" in sidebar
- Click your database: `68878d4300198706e05e`
- Click your collection: `68878d98002e0e623b25`

### 3. **Add Attributes (Fields)**
Click "Create Attribute" button and add these one by one:

#### Attribute 1: name
- **Type:** String
- **Attribute ID:** `name`
- **Size:** 100
- **Required:** Yes ✅
- **Default:** (leave empty)
- Click "Create"

#### Attribute 2: email
- **Type:** String
- **Attribute ID:** `email`
- **Size:** 100
- **Required:** Yes ✅
- **Default:** (leave empty)
- Click "Create"

#### Attribute 3: phone
- **Type:** String
- **Attribute ID:** `phone`
- **Size:** 20
- **Required:** Yes ✅
- **Default:** (leave empty)
- Click "Create"

#### Attribute 4: message
- **Type:** String
- **Attribute ID:** `message`
- **Size:** 2000
- **Required:** Yes ✅
- **Default:** (leave empty)
- Click "Create"

#### Attribute 5: formType
- **Type:** String
- **Attribute ID:** `formType`
- **Size:** 50
- **Required:** No ❌
- **Default:** (leave empty)
- Click "Create"

#### Attribute 6: visaType
- **Type:** String
- **Attribute ID:** `visaType`
- **Size:** 100
- **Required:** No ❌
- **Default:** (leave empty)
- Click "Create"

#### Attribute 7: destination
- **Type:** String
- **Attribute ID:** `destination`
- **Size:** 100
- **Required:** No ❌
- **Default:** (leave empty)
- Click "Create"

#### Attribute 8: submittedAt
- **Type:** String
- **Attribute ID:** `submittedAt`
- **Size:** 50
- **Required:** Yes ✅
- **Default:** (leave empty)
- Click "Create"

### 4. **Set Permissions**
- Go to "Settings" tab in your collection
- Click "Permissions"
- Click "Add Role"
- Select "Any" from dropdown
- Check these permissions:
  - ✅ Create
  - ✅ Read
- Click "Update"

### 5. **Test Forms**
- After all attributes are created
- Go to your website
- Fill any contact form
- Submit form
- Check Appwrite console for data

## ✅ **Important Notes:**
- **Attribute ID** is the field name (must match exactly)
- **Size** is maximum characters allowed
- **Required** means field cannot be empty
- Wait for each attribute to be created before adding next one

**Complete all 8 attributes and set permissions!** 🚀