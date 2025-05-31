document.addEventListener('DOMContentLoaded', function() {
    // Get forms
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Login form validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                showError('Please fill in all required fields.');
                return;
            }
            
            // For demo purposes, simulate successful login
            showSuccess('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            }, 1500);
        });
    }
    
    // Registration form validation
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const contact = document.getElementById('contact').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Basic validation
            if (!firstName || !lastName || !contact || !email || !address || !username || !password || !confirmPassword) {
                showError('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address.');
                return;
            }
            
            // Password match validation
            if (password !== confirmPassword) {
                showError('Passwords do not match.');
                return;
            }
            
            // Password strength validation
            if (password.length < 8) {
                showError('Password must be at least 8 characters long.');
                return;
            }
            
            // For demo purposes, simulate successful registration
            showSuccess('Registration successful! Redirecting to login...');
            
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login
            }, 1500);
        });
    }
    
    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.textContent = message;
        
        // Insert before form
        const form = document.querySelector('form');
        form.parentNode.insertBefore(errorDiv, form);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = message;
        
        // Insert before form
        const form = document.querySelector('form');
        form.parentNode.insertBefore(successDiv, form);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
    
    // Add styles for alerts
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            padding: 12px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
    `;
    document.head.appendChild(style);
});