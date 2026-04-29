// Contact Form Handler for White Wings Visa
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("homeContactForm");
  const submitBtn = form.querySelector(".submit-btn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");
      submitBtn.innerHTML = "<span>Sending...</span>";

      // Get form data
      const formData = new FormData(form);

      // Submit to Formspree
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Success - redirect to thank you page
            window.location.href = "thank-you.html";
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);

          // Show error message
          alert(
            "Sorry, there was an error sending your message. Please try again or contact us directly at +91 9130448831",
          );

          // Reset button
          submitBtn.disabled = false;
          submitBtn.classList.remove("loading");
          submitBtn.innerHTML =
            '<span style="color: white !important;">Send Message</span><i class="ri-send-plane-fill" style="color: white !important;"></i>';
        });
    });

    // Real-time validation
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
  }
});

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

// Phone number formatting
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      // Remove non-numeric characters
      let value = e.target.value.replace(/\D/g, "");

      // Limit to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }

      e.target.value = value;
    });
  }
});
