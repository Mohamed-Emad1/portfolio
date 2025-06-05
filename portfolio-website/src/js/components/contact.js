const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submit-button');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (validateForm(name, email, message)) {
        sendEmail(name, email, message);
    } else {
        displayError('Please fill in all fields correctly.');
    }
});

function validateForm(name, email, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name && emailPattern.test(email) && message;
}

function sendEmail(name, email, message) {
    // Here you would typically send the email using a service like EmailJS or a backend API
    console.log('Sending email:', { name, email, message });
    
    // Simulate a successful email send
    setTimeout(() => {
        displaySuccess('Your message has been sent successfully!');
        contactForm.reset();
    }, 1000);
}

function displaySuccess(msg) {
    successMessage.textContent = msg;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function displayError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}