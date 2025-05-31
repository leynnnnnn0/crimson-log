document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('admin-login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    
    // ddmin accounts (this would be in the database)
    const adminAccounts = [
        { username: 'admin1', password: 'Admin123' },
        { username: 'admin2', password: 'Admin456' },
        { username: 'admin3', password: 'Admin789' }
    ];
    
    // username validation
    usernameInput.addEventListener('blur', function() {
        const username = this.value.trim();
        
        if (username === '') {
            usernameError.textContent = 'Username is required';
        } else {
            // check if it's a valid admin username
            const isAdmin = adminAccounts.some(account => account.username === username);
            if (!isAdmin) {
                usernameError.textContent = 'Invalid admin username';
            } else {
                usernameError.textContent = '';
            }
        }
    });
    
    // Password validation
    passwordInput.addEventListener('blur', function() {
        const password = this.value;
        
        if (password === '') {
            passwordError.textContent = 'Password is required';
        } else {
            passwordError.textContent = '';
        }
    });
    
    // Form submission validation
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Check credentials against admin accounts
        const adminAccount = adminAccounts.find(account => 
            account.username === username && account.password === password
        );
        
        if (adminAccount) {
            // Successful login - redirect to admin dashboard
            window.location.href = 'admin_dashboard.html';
        } else {
            // Failed login
            passwordError.textContent = 'Invalid username or password';
        }
    });
});