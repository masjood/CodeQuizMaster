// Once the DOM is fully loaded, we add the event listener to the signup form
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

// Handle the signup process
function handleSignup(event) {
    event.preventDefault();  // Prevent the default form submission

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Debugging output
    console.log("Username:", username, "Email:", email, "Password:", password, "Confirm Password:", confirmPassword);

    if (!username || !email || !password || !confirmPassword) {
        showMessage('error', 'All fields are required.');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('error', 'Invalid email format. Email must include .com and be in the format name@domain.com.');
        return;
    }

    if (!validatePassword(password)) {
        showMessage('error', 'Password must be at least 8 characters long, include at least one uppercase letter, and one number.');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('error', 'Passwords do not match.');
        return;
    }

    // If all validations pass, send data to the server
    const data = {
        username: username,
        email: email,
        password: password
    };

    sendPostRequest('/api/signup', data, (error, response) => {
        if (error) {
            showMessage('error', 'Signup failed. Please try again.');
            console.error('Signup error:', error);
            return;
        }

        // On successful signup, redirect to login page
        navigateToPage('login'); // Redirect to the login page
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/;
    return re.test(email.toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

