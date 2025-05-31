document.addEventListener('DOMContentLoaded', function() {
    // fet form elements
    const form = document.getElementById('change-password-form');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const passwordMatch = document.getElementById('password-match');
    const submitBtn = document.getElementById('submit-btn');
    const notification = document.getElementById('notification');
    
    // password requirement elements
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqLowercase = document.getElementById('req-lowercase');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');
    
    // password toggle buttons
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    // toggle password visibility
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                targetInput.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
    
    // check password strength
    newPasswordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let strengthClass = '';
        
        // update requirements
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        
        updateRequirement(reqLength, hasLength);
        updateRequirement(reqUppercase, hasUppercase);
        updateRequirement(reqLowercase, hasLowercase);
        updateRequirement(reqNumber, hasNumber);
        updateRequirement(reqSpecial, hasSpecial);
        
        // calculate strength
        if (hasLength) strength += 20;
        if (hasUppercase) strength += 20;
        if (hasLowercase) strength += 20;
        if (hasNumber) strength += 20;
        if (hasSpecial) strength += 20;
        
        // update strength bar
        strengthBar.style.width = strength + '%';
        
        if (strength <= 20) {
            strengthClass = 'very-weak';
            strengthText.textContent = 'Very Weak';
            strengthBar.style.backgroundColor = '#dc3545';
        } else if (strength <= 40) {
            strengthClass = 'weak';
            strengthText.textContent = 'Weak';
            strengthBar.style.backgroundColor = '#ffc107';
        } else if (strength <= 60) {
            strengthClass = 'medium';
            strengthText.textContent = 'Medium';
            strengthBar.style.backgroundColor = '#fd7e14';
        } else if (strength <= 80) {
            strengthClass = 'strong';
            strengthText.textContent = 'Strong';
            strengthBar.style.backgroundColor = '#20c997';
        } else {
            strengthClass = 'very-strong';
            strengthText.textContent = 'Very Strong';
            strengthBar.style.backgroundColor = '#28a745';
        }
        
        // check if passwords match
        checkPasswordMatch();
    });
    
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    
    function checkPasswordMatch() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword === '') {
            passwordMatch.textContent = '';
            passwordMatch.className = 'password-match';
        } else if (newPassword === confirmPassword) {
            passwordMatch.textContent = 'Passwords match';
            passwordMatch.className = 'password-match match';
        } else {
            passwordMatch.textContent = 'Passwords do not match';
            passwordMatch.className = 'password-match no-match';
        }
        
        // enable/disable submit button
        validateForm();
    }
    
    // update requirement status
    function updateRequirement(element, isValid) {
        if (isValid) {
            element.innerHTML = '<i class="fas fa-check-circle"></i> ' + element.textContent.substring(element.textContent.indexOf(' ') + 1);
        } else {
            element.innerHTML = '<i class="fas fa-times-circle"></i> ' + element.textContent.substring(element.textContent.indexOf(' ') + 1);
        }
    }
    
    // validate form
    function validateForm() {
        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        const hasLength = newPassword.length >= 8;
        const hasUppercase = /[A-Z]/.test(newPassword);
        const hasLowercase = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
        
        const isValid = 
            currentPassword !== '' && 
            newPassword !== '' && 
            confirmPassword !== '' && 
            newPassword === confirmPassword &&
            hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
        
        submitBtn.disabled = !isValid;
    }
    
    // form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        
        
        // show success notification
        showNotification('Success', 'Your password has been updated successfully!', 'success');
        
        // reset form
        form.reset();
        strengthBar.style.width = '0';
        strengthText.textContent = 'Password strength';
        passwordMatch.textContent = '';
        passwordMatch.className = 'password-match';
        
        // reset requirements
        document.querySelectorAll('.password-requirements li').forEach(item => {
            item.innerHTML = '<i class="fas fa-times-circle"></i> ' + item.textContent.substring(item.textContent.indexOf(' ') + 1);
        });
        
        // disable the submit button
        submitBtn.disabled = true;
    });
    
    // to show notification
    function showNotification(title, message, type = 'success') {
        const notificationTitle = notification.querySelector('.notification-title');
        const notificationMessage = notification.querySelector('.notification-message');
        const notificationIcon = notification.querySelector('.notification-icon i');
        
        notificationTitle.textContent = title;
        notificationMessage.textContent = message;
        
        if (type === 'error') {
            notification.classList.add('error');
            notificationIcon.className = 'fas fa-times-circle';
        } else {
            notification.classList.remove('error');
            notificationIcon.className = 'fas fa-check-circle';
        }
        
        notification.classList.add('show');
        
        // to hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // close notification
    const notificationClose = document.querySelector('.notification-close');
    if (notificationClose) {
        notificationClose.addEventListener('click', function() {
            notification.classList.remove('show');
        });
    }
});