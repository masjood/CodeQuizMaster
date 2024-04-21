// login.js

// This function will run once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Bind the login function to the login form submit event
    const loginForm = document.getElementById('loginForm'); // Make sure your login form has this ID
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// The login function
function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const usernameInput = document.getElementById('username'); // Adjust ID accordingly
    const passwordInput = document.getElementById('password'); // Adjust ID accordingly

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        // You can call showMessage from main.js if it's included before this script
        showMessage('error', 'Please enter both username and password.');
        return;
    }

    // Construct the data object to send to the server
    const data = {
        username: username,
        password: password
    };

    // Send a POST request to your backend server
    sendPostRequest('/api/login', data, (error, response) => {
        if (error) {
            // Handle error (e.g., show error message to the user)
            showMessage('error', 'Login failed. Please try again.');
            return;
        }

        // On successful login, you can use response data as needed
        // For example, save the session info
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        // Redirect to a new page, or update the UI as needed
        navigateToPage('Index'); // Or whatever page you want to redirect to
    });
}
