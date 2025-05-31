document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('document-request-form');
    const progressLine = document.getElementById('progress-line');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const steps = document.querySelectorAll('.form-section');
    const progressSteps = document.querySelectorAll('.progress-step');
    const courierSelect = document.getElementById('courier');
    const deliveryAddressContainer = document.getElementById('delivery-address-container');
    const paymentMethodSelect = document.getElementById('payment-method');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Initialize progress line
    updateProgressLine();
    
    // Handle next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            
            // Validate current step
            if (validateStep(currentStep)) {
                goToStep(nextStep);
                // Smooth scroll to top of form
                window.scrollTo({
                    top: form.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle previous button clicks
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToStep(prevStep);
            // Smooth scroll to top of form
            window.scrollTo({
                top: form.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle courier selection
    courierSelect.addEventListener('change', function() {
        if (this.value && this.value !== 'pickup') {
            deliveryAddressContainer.style.display = 'block';
        } else {
            deliveryAddressContainer.style.display = 'none';
        }
    });
    
    // Handle payment method selection
    paymentMethodSelect.addEventListener('change', function() {
        const paymentDetailsContainer = document.getElementById('payment-details-container');
        if (!paymentDetailsContainer) return;
        
        paymentDetailsContainer.style.display = 'block';
        
        // Clear previous content
        paymentDetailsContainer.innerHTML = '';
        
        // Add appropriate fields based on payment method
        switch(this.value) {
            case 'gcash':
                paymentDetailsContainer.innerHTML = `
                    <div class="form-group">
                        <label for="gcash-number">GCASH NUMBER</label>
                        <input type="text" id="gcash-number" class="form-control" required>
                    </div>
                `;
                break;
            case 'bank':
                paymentDetailsContainer.innerHTML = `
                    <div class="form-group">
                        <label for="bank-name">BANK NAME</label>
                        <input type="text" id="bank-name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="account-number">ACCOUNT NUMBER</label>
                        <input type="text" id="account-number" class="form-control" required>
                    </div>
                `;
                break;
            case 'credit_card':
                paymentDetailsContainer.innerHTML = `
                    <div class="form-group">
                        <label for="card-number">CARD NUMBER</label>
                        <input type="text" id="card-number" class="form-control" required>
                    </div>
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="expiry-date">EXPIRY DATE</label>
                                <input type="text" id="expiry-date" class="form-control" placeholder="MM/YY" required>
                            </div>
                        </div>
                        <div class="form-col">
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" class="form-control" required>
                            </div>
                        </div>
                    </div>
                `;
                break;
            default:
                paymentDetailsContainer.style.display = 'none';
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // In a real application, you would submit the form data to the server here
            // For demo purposes, we'll just show the success message
        }
    });
    
    // Function to go to a specific step
    function goToStep(step) {
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show the target step
        document.getElementById(`step-${step}`).classList.add('active');
        
        // Update progress steps
        progressSteps.forEach((progressStep, index) => {
            const stepNumber = index + 1;
            const stepMarker = progressStep.querySelector('.step-marker');
            
            if (stepNumber < step) {
                stepMarker.classList.add('completed');
                stepMarker.classList.remove('active');
                progressStep.classList.add('completed');
                progressStep.classList.remove('active');
            } else if (stepNumber === step) {
                stepMarker.classList.add('active');
                stepMarker.classList.remove('completed');
                progressStep.classList.add('active');
                progressStep.classList.remove('completed');
            } else {
                stepMarker.classList.remove('active', 'completed');
                progressStep.classList.remove('active', 'completed');
            }
        });
        
        // Update current step
        currentStep = step;
        
        // Update progress line
        updateProgressLine();
        
        // If moving to confirmation step, populate the confirmation details
        if (step === 5) {
            populateConfirmationDetails();
        }
    }
    
    // Function to populate confirmation details
    function populateConfirmationDetails() {
        const confirmationDetails = document.getElementById('confirmation-details');
        confirmationDetails.innerHTML = '';
        
        // Get document type
        const documentTypeSelect = document.querySelector('#document-type');
        const documentType = documentTypeSelect.value;
        const documentTypeText = documentTypeSelect.options[documentTypeSelect.selectedIndex].text;
        addConfirmationItem(confirmationDetails, 'Document Type', documentTypeText);
        
        // Get personal details
        const firstName = document.querySelector('#first-name').value;
        const middleName = document.querySelector('#middle-name').value;
        const lastName = document.querySelector('#last-name').value;
        const fullName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
        addConfirmationItem(confirmationDetails, 'Full Name', fullName);
        
        const sexSelect = document.querySelector('#sex');
        const sex = sexSelect.value;
        const sexText = sexSelect.options[sexSelect.selectedIndex].text;
        addConfirmationItem(confirmationDetails, 'Sex', sexText);
        
        const dob = document.querySelector('#date-of-birth').value;
        // Format date if needed
        const formattedDate = dob ? new Date(dob).toLocaleDateString() : '';
        addConfirmationItem(confirmationDetails, 'Date of Birth', formattedDate);
        
        const pob = document.querySelector('#place-of-birth').value;
        addConfirmationItem(confirmationDetails, 'Place of Birth', pob);
        
        // Get delivery method
        const courierSelect = document.querySelector('#courier');
        const deliveryMethod = courierSelect.value;
        const deliveryMethodText = courierSelect.options[courierSelect.selectedIndex].text;
        addConfirmationItem(confirmationDetails, 'Delivery Method', deliveryMethodText);
        
        // If courier delivery, add address details
        if (deliveryMethod && deliveryMethod !== 'pickup') {
            const address = document.querySelector('#delivery-address').value;
            addConfirmationItem(confirmationDetails, 'Address', address);
            
            const city = document.querySelector('#city').value;
            addConfirmationItem(confirmationDetails, 'City', city);
            
            const province = document.querySelector('#province').value;
            addConfirmationItem(confirmationDetails, 'Province', province);
            
            const postalCode = document.querySelector('#postal-code').value;
            addConfirmationItem(confirmationDetails, 'Postal Code', postalCode);
        }
        
        // Get payment method
        const paymentMethodSelect = document.querySelector('#payment-method');
        const paymentMethod = paymentMethodSelect.value;
        const paymentMethodText = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;
        addConfirmationItem(confirmationDetails, 'Payment Method', paymentMethodText);
    }
    
    // Helper function to add an item to the confirmation details
    function addConfirmationItem(container, label, value) {
        if (!value) return; // Skip empty values
        
        const item = document.createElement('div');
        item.className = 'confirmation-item';
        
        const labelElement = document.createElement('span');
        labelElement.className = 'confirmation-label';
        labelElement.textContent = label + ':';
        
        const valueElement = document.createElement('span');
        valueElement.className = 'confirmation-value';
        valueElement.textContent = value;
        
        item.appendChild(labelElement);
        item.appendChild(valueElement);
        container.appendChild(item);
    }
    
    // Function to update progress line
    function updateProgressLine() {
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressLine.style.width = `${progressPercentage}%`;
    }
    
    // Function to validate step
    function validateStep(step) {
        const currentStepElement = document.getElementById(`step-${step}`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        // Remove any existing error messages
        const errorMessages = currentStepElement.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
        
        // Reset all fields
        requiredFields.forEach(field => {
            field.classList.remove('error');
        });
        
        // Validate each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'This field is required';
                field.parentNode.appendChild(errorMessage);
            }
        });
        
        return isValid;
    }
    
    // User menu toggle
    document.getElementById('user-menu-trigger').addEventListener('click', function(e) {
        const menu = document.getElementById('user-menu');
        menu.classList.toggle('active');
        e.stopPropagation();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function() {
        const menu = document.getElementById('user-menu');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
    
    // Prevent menu from closing when clicking inside it
    document.getElementById('user-menu').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Function to redirect to dashboard
function redirectToDashboard() {
    window.location.href = 'dashboard.html';
}

// Handle form submission
document.getElementById('document-request-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
});

document.getElementById('user-menu-trigger').addEventListener('click', function(e) {
    const menu = document.getElementById('user-menu');
    menu.classList.toggle('active');
    e.stopPropagation();
});

// Close menu when clicking outside
document.addEventListener('click', function() {
    const menu = document.getElementById('user-menu');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
});
