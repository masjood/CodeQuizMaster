// contact.js

// Once the DOM is fully loaded, we add the event listener to the contact form
document.addEventListener('DOMContentLoaded', (event) => {
    const contactForm = document.getElementById('contactForm'); // Ensure your form has this ID
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

// Handle the contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate the input
    if (!name || !email || !message) {
        showMessage('error', 'All fields are required.');
        return;
    }

    // Construct the data object to send to the server
    const data = {
        name: name,
        email: email,
        message: message
    };

    // Send a POST request to your backend server
    sendPostRequest('/api/contact', data, (error, response) => {
        if (error) {
            // Handle error (e.g., show error message to the user)
            showMessage('error', 'Failed to send message. Please try again later.');
            return;
        }

        // On successful form submission
        showMessage('success', 'Thank you! Your message has been sent successfully.');
        // Optionally, clear the form
        contactForm.reset();
    });
}
