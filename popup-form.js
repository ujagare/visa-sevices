document.addEventListener('DOMContentLoaded', function() {
  // Wait before showing popup (3 seconds)
  setTimeout(function() {
    showPopup();
  }, 3000);
  
  // Close popup when clicking the close button
  document.querySelector('.popup-close').addEventListener('click', function() {
    hidePopup();
  });
  
  // Close popup when clicking outside the form
  document.querySelector('.popup-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
      hidePopup();
    }
  });
  
  // Set cookie when form is submitted
  document.querySelector('.popup-form').addEventListener('submit', function() {
    setCookie('formSubmitted', 'true', 30); // Don't show again for 30 days
  });
});

function showPopup() {
  // Check if form was already submitted
  if (getCookie('formSubmitted') !== 'true') {
    document.querySelector('.popup-overlay').classList.add('active');
  }
}

function hidePopup() {
  document.querySelector('.popup-overlay').classList.remove('active');
}

// Cookie functions
function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}