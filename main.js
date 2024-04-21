// main.js

// Check the user's session when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
  checkUserSession();
});

// Function to check user session and update UI accordingly
function checkUserSession() {
  const user = localStorage.getItem('currentUser');
  if (user) {
      document.getElementById('loginButton').style.display = 'none';
      document.getElementById('signupButton').style.display = 'none';
      document.getElementById('userNameDisplay').innerText = `Welcome, ${user}`;
  } else {
      // Optional: Handle UI changes or redirects if the user is not logged in
  }
}

// Navigation handler to redirect to different pages
function navigateToPage(pageName) {
  window.location.href = `${pageName}.html`;
}

// Show a message to the user with a type indicating the message style
function showMessage(type, message) {
  const messageContainer = document.getElementById('messageContainer');
  if (!messageContainer) {
      console.error('Message container element not found');
      return;
  }
  messageContainer.classList.add(`message-${type}`);
  messageContainer.innerText = message;
  messageContainer.style.display = 'block';
  setTimeout(() => {
      messageContainer.style.display = 'none';
  }, 5000);
}

// Utility function to send a GET request to the server
function sendGetRequest(url, callback) {
  fetch(url)
      .then(response => {
          if (!response.ok) {
              return response.json().then(error => Promise.reject(error));
          }
          return response.json();
      })
      .then(data => callback(null, data))
      .catch(error => callback(error, null));
}

// Utility function to send a POST request to the server
function sendPostRequest(url, data, callback) {
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Additional headers can be added here
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(error => Promise.reject(error));
      }
      return response.json();
  })
  .then(data => callback(null, data))
  .catch(error => callback(error, null));
}

// If using ES6 modules, uncomment to export these functions
// export { checkUserSession, navigateToPage, showMessage, sendGetRequest, sendPostRequest };
