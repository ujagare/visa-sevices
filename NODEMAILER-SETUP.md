# NodeMailer सेटअप निर्देश

इस दस्तावेज़ में बताया गया है कि White Wings Visa वेबसाइट पर NodeMailer का उपयोग करके कॉन्टैक्ट फॉर्म से ईमेल कैसे भेजें।

## आवश्यक सॉफ्टवेयर

1. **Node.js और npm** - [https://nodejs.org/](https://nodejs.org/) से डाउनलोड करें और इंस्टॉल करें

## सेटअप निर्देश

1. **पैकेज इंस्टॉल करें**
   ```
   cd c:\Users\ujaga\OneDrive\Desktop\visa
   npm install
   ```

2. **.env फाइल अपडेट करें**
   `.env` फाइल में अपने मेल सर्वर की जानकारी अपडेट करें:
   ```
   EMAIL_HOST=mail.whitewingsvisa.com
   EMAIL_PORT=587
   EMAIL_USER=mrunal@whitewingsvisa.com
   EMAIL_PASS=your_email_password_here
   EMAIL_FROM=White Wings Visa <mrunal@whitewingsvisa.com>
   ```

3. **सर्वर शुरू करें**
   ```
   npm start
   ```

4. **वेबसाइट एक्सेस करें**
   अपने ब्राउज़र में `http://localhost:3000` खोलें

## होस्टिंग पर डिप्लॉय करने के लिए

1. **Node.js होस्टिंग सर्विस का उपयोग करें**
   - [Heroku](https://www.heroku.com/)
   - [DigitalOcean](https://www.digitalocean.com/)
   - [Vercel](https://vercel.com/)
   - [Netlify](https://www.netlify.com/) (फंक्शन के साथ)

2. **होस्टिंग पर .env वेरिएबल्स सेट करें**
   अपनी होस्टिंग सर्विस के डैशबोर्ड में एनवायरनमेंट वेरिएबल्स सेट करें।

## समस्या निवारण

1. **ईमेल नहीं भेजा जा रहा है**
   - सुनिश्चित करें कि आपके मेल सर्वर की जानकारी सही है
   - पोर्ट नंबर की जांच करें (आमतौर पर 587, 465, या 25)
   - अपने होस्टिंग प्रोवाइडर से पूछें कि क्या वे SMTP आउटगोइंग मेल की अनुमति देते हैं

2. **सर्वर एरर**
   - कंसोल लॉग देखें
   - सुनिश्चित करें कि सभी पैकेज इंस्टॉल हैं
   - Node.js वर्जन चेक करें (v14+ अनुशंसित)

## अतिरिक्त विकल्प

अगर आपके सर्वर पर Node.js नहीं चल सकता, तो इन विकल्पों पर विचार करें:

1. **SendGrid API का उपयोग करें**
   - [SendGrid](https://sendgrid.com/) पर अकाउंट बनाएं
   - उनके API का उपयोग करें

2. **Mailgun API का उपयोग करें**
   - [Mailgun](https://www.mailgun.com/) पर अकाउंट बनाएं
   - उनके API का उपयोग करें

3. **FormSubmit.co का उपयोग करें**
   - फॉर्म एक्शन को वापस `https://formsubmit.co/mrunal@whitewingsvisa.com` पर सेट करें

## अधिक सहायता के लिए

अगर आपको अतिरिक्त सहायता की आवश्यकता है, तो कृपया वेब डेवलपर से संपर्क करें।