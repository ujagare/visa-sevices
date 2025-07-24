# FormSubmit Implementation Guide

This guide explains how to implement the FormSubmit forms on your White Wings Visa Consultancy website.

## 1. Newsletter Subscription Form

### How to Add to Your Website:

1. Add the CSS file to your head section:
   ```html
   <link rel="stylesheet" href="newsletter-form.css">
   ```

2. Add the HTML form where you want it to appear (e.g., in the footer or sidebar):
   ```html
   <div class="newsletter-form-container">
       <h3>Subscribe to Our Newsletter</h3>
       <p>Stay updated with the latest visa news and travel requirements</p>
       
       <form class="newsletter-form" action="https://formsubmit.co/mrunal@whitewingsvisa.com" method="POST">
           <input type="hidden" name="_subject" value="New Newsletter Subscription">
           <input type="hidden" name="_next" value="https://whitewingsvisa.com/thank-you.html">
           <input type="hidden" name="_captcha" value="false">
           <input type="hidden" name="_template" value="table">
           <input type="hidden" name="form-name" value="newsletter">
           
           <input type="email" name="email" placeholder="Your email address" required>
           <button type="submit">Subscribe</button>
       </form>
   </div>
   ```

## 2. Popup Form

### How to Add to Your Website:

1. Add the CSS and JavaScript files to your head section:
   ```html
   <link rel="stylesheet" href="popup-form.css">
   <script src="popup-form.js" defer></script>
   ```

2. Add the popup HTML just before the closing body tag:
   ```html
   <!-- Popup Form Overlay -->
   <div class="popup-overlay">
     <div class="popup-container">
       <button class="popup-close">&times;</button>
       
       <form class="popup-form" action="https://formsubmit.co/mrunal@whitewingsvisa.com" method="POST">
         <input type="hidden" name="_subject" value="New Visa Inquiry">
         <input type="hidden" name="_next" value="https://whitewingsvisa.com/thank-you.html">
         <input type="hidden" name="_captcha" value="false">
         <input type="hidden" name="_template" value="table">
         <input type="hidden" name="form-name" value="popup-inquiry">
         
         <h3>Get a Free Visa Assessment</h3>
         <p>Enter your details for a quick visa eligibility check</p>
         
         <input type="text" name="name" placeholder="Your Name" required>
         <input type="email" name="email" placeholder="Your Email" required>
         <input type="tel" name="phone" placeholder="Your Phone Number">
         <input type="text" name="destination" placeholder="Destination Country">
         
         <button type="submit">Check My Eligibility</button>
       </form>
     </div>
   </div>
   ```

## Important Notes:

1. **Email Verification**: The first time someone submits a form to your email address through FormSubmit, you'll receive a confirmation email. You must click the activation link to start receiving form submissions.

2. **Spam Protection**: FormSubmit has built-in spam protection, but you can enhance it by adding a honeypot field:
   ```html
   <input type="text" name="_honey" style="display:none">
   ```

3. **Customization Options**:
   - `_subject`: Customize the email subject
   - `_next`: Redirect URL after form submission
   - `_captcha`: Enable/disable CAPTCHA (true/false)
   - `_template`: Email template format (table, box, etc.)

4. **File Uploads**: If you need to allow file uploads, add `enctype="multipart/form-data"` to your form and use `<input type="file" name="attachment">`.

## Testing Your Forms

1. Submit a test entry through each form
2. Check your email to confirm you received the submission
3. Verify that the thank-you page redirection works correctly

For more information, visit [FormSubmit.co](https://formsubmit.co/).