document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const landingPage = document.getElementById('landing-page');
    const formPage = document.getElementById('form-page');
    const getStartedBtn = document.getElementById('get-started');
    const backBtn = document.getElementById('btn-back');
    const nextBtn = document.getElementById('btn-next');
    const progressSteps = document.querySelectorAll('.progress-step');
    const marriageForm = document.getElementById('marriage-form');
    
    // Current step
    let currentStep = 1;
    
    // Event listeners
    getStartedBtn.addEventListener('click', function() {
        landingPage.style.transform = 'translateX(-100%)';
        formPage.style.transform = 'translateX(0)';
        updateProgressIndicator();
    });
    
    backBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateProgressIndicator();
            // Add logic here if you have multiple form steps
        } else {
            landingPage.style.transform = 'translateX(0)';
            formPage.style.transform = 'translateX(100%)';
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (validateForm()) {
            // Store form data in localStorage for persistence
            saveFormData();
            
            // Move to next step
            currentStep++;
            updateProgressIndicator();
            
            // If this is the final step, submit the form
            if (currentStep > 3) {
                submitForm();
            } else {
                // Show success message for current step
                showNotification('Information saved successfully!', 'success');
              
            }
        }
    });
    
    // Form validation
    function validateForm() {
        // Get all required fields
        const requiredFields = {
            'husband-fullname': 'Husband\'s full name',
            'husband-dob': 'Husband\'s date of birth',
            'husband-pob': 'Husband\'s place of birth',
            'husband-residence': 'Husband\'s residence',
            'wife-fullname': 'Wife\'s full name',
            'wife-dob': 'Wife\'s date of birth',
            'wife-pob': 'Wife\'s place of birth',
            'wife-residence': 'Wife\'s residence'
        };
        
        let isValid = true;
        let errorMessage = 'Please fill in the following fields:\n';
        
        // Check each required field
        for (const [id, label] of Object.entries(requiredFields)) {
            const field = document.getElementById(id);
            if (!field.value.trim()) {
                isValid = false;
                errorMessage += `- ${label}\n`;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        }
        
        if (!isValid) {
            showNotification(errorMessage, 'error');
        }
        
        return isValid;
    }
    
    // Save form data to localStorage
    function saveFormData() {
        const formData = {
            husband: {
                fullname: document.getElementById('husband-fullname').value,
                dob: document.getElementById('husband-dob').value,
                pob: document.getElementById('husband-pob').value,
                residence: document.getElementById('husband-residence').value
            },
            wife: {
                fullname: document.getElementById('wife-fullname').value,
                dob: document.getElementById('wife-dob').value,
                pob: document.getElementById('wife-pob').value,
                residence: document.getElementById('wife-residence').value
            },
            step: currentStep
        };
        
        localStorage.setItem('marriageRegistrationData', JSON.stringify(formData));
    }
    
    // Load saved form data if available
    function loadFormData() {
        const savedData = localStorage.getItem('marriageRegistrationData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            // Populate form fields
            document.getElementById('husband-fullname').value = formData.husband.fullname || '';
            document.getElementById('husband-dob').value = formData.husband.dob || '';
            document.getElementById('husband-pob').value = formData.husband.pob || '';
            document.getElementById('husband-residence').value = formData.husband.residence || '';
            
            document.getElementById('wife-fullname').value = formData.wife.fullname || '';
            document.getElementById('wife-dob').value = formData.wife.dob || '';
            document.getElementById('wife-pob').value = formData.wife.pob || '';
            document.getElementById('wife-residence').value = formData.wife.residence || '';
            
            // Restore step if needed
            if (formData.step > 1) {
                currentStep = formData.step;
                landingPage.style.transform = 'translateX(-100%)';
                formPage.style.transform = 'translateX(0)';
                updateProgressIndicator();
            }
        }
    }
    
    // Submit the form (placeholder for actual submission)
    function submitForm() {
        showNotification('Marriage license registration submitted successfully!', 'success');
        
        // Clear the form and localStorage after successful submission
        marriageForm.reset();
        localStorage.removeItem('marriageRegistrationData');
        
        // Reset to step 1
        setTimeout(() => {
            currentStep = 1;
            updateProgressIndicator();
            landingPage.style.transform = 'translateX(0)';
            formPage.style.transform = 'translateX(100%)';
        }, 2000);
    }
    
    // Show notification
    function showNotification(message, type) {
        // Check if notification container exists, create if not
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function() {
            notification.remove();
        };
        notification.appendChild(closeBtn);
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Update progress indicator
    function updateProgressIndicator() {
        progressSteps.forEach((step, index) => {
            if (index + 1 <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Initialize date inputs to show placeholder
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (!this.value) {
                this.type = 'date';
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.type = 'text';
            }
        });
        
        // Initialize as text if empty
        if (!input.value) {
            input.type = 'text';
        }
    });
    
    // Add CSS for notifications and form validation
    addStyles();
    
    // Load saved form data on page load
    loadFormData();
    
    // Function to add required styles
    function addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
            }
            
            .notification {
                margin-bottom: 10px;
                padding: 15px;
                border-radius: 5px;
                color: white;
                position: relative;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification.success {
                background-color: #4CAF50;
            }
            
            .notification.error {
                background-color: #F44336;
            }
            
            .notification-close {
                position: absolute;
                top: 5px;
                right: 10px;
                cursor: pointer;
                font-size: 18px;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            input.error {
                border: 1px solid #F44336;
                background-color: rgba(244, 67, 54, 0.1);
            }
        `;
        document.head.appendChild(styleElement);
    }
});