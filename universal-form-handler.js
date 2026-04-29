// Universal Form Handler for All White Wings Visa Forms - Vercel + Resend
document.addEventListener("DOMContentLoaded", function () {
  console.log("Universal Form Handler Loaded");

  // List of all form IDs to handle
  const formIds = [
    "homeContactForm",
    "workForm1",
    "workForm2",
    "visitForm",
    "migrateForm1",
    "contactForm",
    "testForm",
  ];

  // Initialize all forms
  formIds.forEach((formId) => {
    const form = document.getElementById(formId);
    if (form) {
      console.log(`Initializing form: ${formId}`);
      initializeForm(form, formId);
    }
  });

  function initializeForm(form, formId) {
    // Find submit button with multiple selectors
    let submitBtn =
      form.querySelector('button[type="submit"]') ||
      form.querySelector(".submit-btn") ||
      form.querySelector(".btn-submit") ||
      form.querySelector('input[type="submit"]') ||
      form.querySelector("button");

    // If no submit button found, create one
    if (!submitBtn) {
      submitBtn = document.createElement("button");
      submitBtn.type = "submit";
      submitBtn.className = "submit-btn";
      submitBtn.innerHTML = "<span>Send Message</span>";
      form.appendChild(submitBtn);
      console.log(`Created submit button for ${formId}`);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(`Form ${formId} submitted`);

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "<span>Sending...</span>";
        submitBtn.setAttribute("data-original", originalText);
      }

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Add form identification
      data.formType = getFormType(formId);
      data.formId = formId;
      data.timestamp = new Date().toISOString();

      console.log("Sending data:", data);

      // Submit to Vercel API
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log("Response status:", response.status);
          return response.json();
        })
        .then((result) => {
          console.log("Response result:", result);
          if (result.success) {
            // Success - redirect to thank you page
            window.location.href = "thank-you.html";
          } else {
            throw new Error(result.error || "Form submission failed");
          }
        })
        .catch((error) => {
          console.error("Form submission error:", error);

          // Show error message
          showErrorMessage(
            `Sorry, there was an error sending your message. Please try again or contact us directly at +91 9130448831. Error: ${error.message}`,
          );

          // Reset button
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
            submitBtn.innerHTML =
              submitBtn.getAttribute("data-original") || "Send Message";
          }
        });
    });

    // Add real-time validation
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this);
        }
      });
    });

    // Phone number formatting
    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
        e.target.value = value;
      });
    }
  }

  function getFormType(formId) {
    const formTypes = {
      homeContactForm: "Home Contact Form",
      workForm1: "Work Visa Inquiry",
      workForm2: "Premium Work Assessment",
      visitForm: "Visit Visa Assessment",
      migrateForm1: "Migration Inquiry",
      contactForm: "Contact Page Form",
      testForm: "Test Form",
    };
    return formTypes[formId] || "General Inquiry";
  }

  function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;

    // Remove existing error styling
    field.classList.remove("error");

    // Check if field is required and empty
    if (field.hasAttribute("required") && !value) {
      showFieldError(field, "This field is required");
      return false;
    }

    // Email validation
    if (fieldType === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, "Please enter a valid email address");
        return false;
      }
    }

    // Phone validation
    if (fieldName === "phone" && value) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        showFieldError(field, "Please enter a valid 10-digit phone number");
        return false;
      }
    }

    // Clear any error styling if validation passes
    clearFieldError(field);
    return true;
  }

  function showFieldError(field, message) {
    field.classList.add("error");

    // Remove existing error message
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.color = "#e74c3c";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.marginTop = "5px";

    field.parentNode.appendChild(errorDiv);
  }

  function clearFieldError(field) {
    field.classList.remove("error");
    const errorMessage = field.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function showErrorMessage(message) {
    // Create modal or alert
    const modal = document.createElement("div");
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

    const content = document.createElement("div");
    content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            margin: 20px;
        `;

    content.innerHTML = `
            <h3 style="color: #e74c3c; margin-bottom: 15px;">Error</h3>
            <p style="margin-bottom: 20px; line-height: 1.5;">${message}</p>
            <button onclick="this.closest('.error-modal').remove()" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            ">OK</button>
        `;

    modal.className = "error-modal";
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Auto remove after 10 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 10000);
  }
});
