document.addEventListener('DOMContentLoaded', function() {
    const marriageForm = document.getElementById('marriage-application-form');
    const sameAddressCheckbox = document.getElementById('same-address');
    const permanentAddressInput = document.getElementById('permanent-address');
    const currentAddressInput = document.getElementById('current-address');
    const dateOfBirthInput = document.getElementById('date-of-birth');
    const uploadButtons = document.querySelectorAll('.upload-btn');
    
    // Handle same address checkbox
    sameAddressCheckbox.addEventListener('change', function() {
        if (this.checked) {
            currentAddressInput.value = permanentAddressInput.value;
            currentAddressInput.disabled = true;
        } else {
            currentAddressInput.disabled = false;
        }
    });
    
    // Update current address when permanent address changes if checkbox is checked
    permanentAddressInput.addEventListener('input', function() {
        if (sameAddressCheckbox.checked) {
            currentAddressInput.value = this.value;
        }
    });
    
    // Initialize date picker for date of birth
    if (dateOfBirthInput) {
        // add basic date input functionality
        dateOfBirthInput.addEventListener('focus', function() {
            this.type = 'date';
        });
        
        dateOfBirthInput.addEventListener('blur', function() {
            if (!this.value) {
                this.type = 'text';
            }
        });
    }
    
    // Handle file uploads
    uploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf,.jpg,.jpeg,.png';
            
            fileInput.addEventListener('change', function() {
                if (fileInput.files.length > 0) {
                    const fileName = fileInput.files[0].name;
                    // Update button text to show file was selected
                    button.textContent = 'Uploaded';
                    button.classList.add('uploaded');
                    
                    console.log(`File selected: ${fileName}`);
                }
            });
            
            fileInput.click();
        });
    });
    
    // Form submission
    marriageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = marriageForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message
        alert('Application submitted successfully!');
        
        // Redirect to view marriage page after successful submission
        setTimeout(() => {
            window.location.href = 'view_marriage.html';
        }, 1500);
    });
    
    // Get user data from localStorage
    document.addEventListener('DOMContentLoaded', function() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            document.getElementById('profileName').textContent = userData.name;
            document.getElementById('profileEmail').textContent = userData.email;
        }
    });
    
    
    // User menu toggle
    document.querySelector('.user-section').addEventListener('click', function(e) {
        const menu = document.querySelector('.user-menu');
        menu.classList.toggle('active');
        e.stopPropagation();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function() {
        const menu = document.querySelector('.user-menu');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
});