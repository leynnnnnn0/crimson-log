document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('reset-password-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email === '') {
            emailError.textContent = 'Email is required';
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            alert('If this email is registered, you will receive password reset instructions.');
            window.location.href = 'admin_login.html';
        }
    });
});