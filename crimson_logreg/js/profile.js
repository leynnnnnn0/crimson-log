document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Enhanced Avatar upload functionality
    const avatarInput = document.getElementById('avatar-input');
    const profileAvatar = document.getElementById('profile-avatar');
    
    // Create modal elements for image cropping
    createImageCropperModal();
    
    avatarInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Image size should be less than 2MB');
                return;
            }
            
            // Create a FileReader to read the image
            const reader = new FileReader();
            reader.onload = function(e) {
                // Show image cropper modal
                showImageCropper(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission handlers
    const personalInfoForm = document.getElementById('personal-info-form');
    const contactInfoForm = document.getElementById('contact-info-form');
    
    personalInfoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('first-name').value;
        const middleName = document.getElementById('middle-name').value;
        const lastName = document.getElementById('last-name').value;
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.getElementById('gender').value;
        const civilStatus = document.getElementById('civil-status').value;
        
        // Update profile name
        document.getElementById('profile-fullname').textContent = `${firstName} ${lastName}`;
        
        // Update user name in header and menu
        const fullName = `${firstName} ${lastName}`;
        document.getElementById('user-name').textContent = fullName;
        document.getElementById('menu-user-name').textContent = fullName;
        
        // Save to localStorage (for demo purposes)
        const personalInfo = {
            firstName,
            middleName,
            lastName,
            birthdate,
            gender,
            civilStatus
        };
        localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
        localStorage.setItem('userName', fullName);
        
        // Show success message
        showNotification('Personal information updated successfully');
        
    });
    
    // Add this to your existing contact form submission handler
    contactInfoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        // Update email in menu
        document.getElementById('menu-user-email').textContent = email;
        
        // Save to localStorage (for demo purposes)
        const contactInfo = {
            email,
            phone,
            address
        };
        localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
        
        // Show success message
        showNotification('Contact information updated successfully');
        
    });
    
    // Load saved data if exists
    loadProfileData();
});

// Function to load profile data from localStorage
function loadProfileData() {
    // Load personal info
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    if (personalInfo) {
        document.getElementById('first-name').value = personalInfo.firstName || '';
        document.getElementById('middle-name').value = personalInfo.middleName || '';
        document.getElementById('last-name').value = personalInfo.lastName || '';
        document.getElementById('birthdate').value = personalInfo.birthdate || '';
        document.getElementById('gender').value = personalInfo.gender || 'male';
        document.getElementById('civil-status').value = personalInfo.civilStatus || 'single';
        
        // Update profile name
        document.getElementById('profile-fullname').textContent = 
            `${personalInfo.firstName} ${personalInfo.lastName}`;
        
        // Update username
        document.getElementById('profile-username').textContent = 
            `@${personalInfo.firstName.toLowerCase()}${personalInfo.lastName.toLowerCase()}`;
    }
    
    // Load contact info
    const contactInfo = JSON.parse(localStorage.getItem('contactInfo'));
    if (contactInfo) {
        document.getElementById('email').value = contactInfo.email || '';
        document.getElementById('phone').value = contactInfo.phone || '';
        document.getElementById('address').value = contactInfo.address || '';
        
        // Update email in menu
        document.getElementById('menu-user-email').textContent = contactInfo.email;
    }
    
    // Load avatar
    const userAvatar = localStorage.getItem('userAvatar');
    if (userAvatar) {
        document.getElementById('profile-avatar').src = userAvatar;
        
        // Also update header avatar if exists
        const headerAvatar = document.querySelector('.avatar');
        const menuAvatar = document.querySelector('.menu-avatar');
        if (headerAvatar) headerAvatar.src = userAvatar;
        if (menuAvatar) menuAvatar.src = userAvatar;
    }
}

// Function to show notification
function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        // Create notification container
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style notification
    notification.style.backgroundColor = '#fff';
    notification.style.color = '#333';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
    notification.style.marginTop = '10px';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.animation = 'slideIn 0.3s ease forwards';
    
    // Style notification content
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.display = 'flex';
    notificationContent.style.alignItems = 'center';
    
    // Style icon
    const icon = notification.querySelector('i');
    icon.style.color = '#8B0000';
    icon.style.marginRight = '10px';
    icon.style.fontSize = '20px';
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Add animations to head
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to create image cropper modal
function createImageCropperModal() {
    const modal = document.createElement('div');
    modal.id = 'avatar-crop-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Crop Profile Picture</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="cropper-container">
                    <img id="crop-image" src="" alt="Image to crop">
                </div>
                <div class="preview-container">
                    <div class="preview-label">Preview</div>
                    <div class="avatar-preview"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancel-crop" class="btn btn-secondary">Cancel</button>
                <button id="apply-crop" class="btn btn-primary">Apply</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1001;
            overflow: auto;
            align-items: center;
            justify-content: center;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal-content {
            background-color: #fff;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }
        
        .modal-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .cropper-container {
            width: 100%;
            height: 300px;
            overflow: hidden;
        }
        
        .preview-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        
        .preview-label {
            font-size: 14px;
            color: #666;
        }
        
        .avatar-preview {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #8B0000;
        }
        
        .modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .btn-secondary {
            background-color: #f5f5f5;
            color: #333;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .cropper-view-box,
        .cropper-face {
            border-radius: 50%;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add event listeners for modal
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancel-crop');
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    function closeModal() {
        modal.classList.remove('active');
        // Reset file input
        document.getElementById('avatar-input').value = '';
    }
}

// Function to show image cropper
function showImageCropper(imageSrc) {
    const modal = document.getElementById('avatar-crop-modal');
    const cropImage = document.getElementById('crop-image');
    
    // Set image source
    cropImage.src = imageSrc;
    
    // Show modal
    modal.classList.add('active');
    
    // Initialize cropper
    if (window.cropper) {
        window.cropper.destroy();
    }
    
    // Load Cropper.js library if not already loaded
    if (typeof Cropper === 'undefined') {
        loadCropperLibrary().then(() => {
            initCropper(cropImage);
        });
    } else {
        initCropper(cropImage);
    }
}

// Function to load Cropper.js library
function loadCropperLibrary() {
    return new Promise((resolve, reject) => {
        // Load CSS
        const cropperCSS = document.createElement('link');
        cropperCSS.rel = 'stylesheet';
        cropperCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css';
        document.head.appendChild(cropperCSS);
        
        // Load JS
        const cropperJS = document.createElement('script');
        cropperJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js';
        cropperJS.onload = resolve;
        cropperJS.onerror = reject;
        document.head.appendChild(cropperJS);
    });
}

// Function to initialize cropper
function initCropper(image) {
    window.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        ready: function() {
            // Update preview on crop
            updatePreview();
        },
        crop: function() {
            updatePreview();
        }
    });
    
    // Add event listener for apply button
    document.getElementById('apply-crop').addEventListener('click', applyCrop);
}

// Function to update preview
function updatePreview() {
    const canvas = window.cropper.getCroppedCanvas({
        width: 100,
        height: 100
    });
    
    const previewContainer = document.querySelector('.avatar-preview');
    previewContainer.innerHTML = '';
    previewContainer.appendChild(canvas);
}

// Function to apply crop
function applyCrop() {
    const canvas = window.cropper.getCroppedCanvas({
        width: 300,
        height: 300
    });
    
    // Convert canvas to data URL
    const croppedImageData = canvas.toDataURL('image/jpeg');
    
    // Update avatar preview
    const profileAvatar = document.getElementById('profile-avatar');
    profileAvatar.src = croppedImageData;
    
    // Also update header avatar if exists
    const headerAvatar = document.querySelector('.avatar');
    const menuAvatar = document.querySelector('.menu-avatar');
    if (headerAvatar) headerAvatar.src = croppedImageData;
    if (menuAvatar) menuAvatar.src = croppedImageData;
    
    // Save avatar to localStorage (for demo purposes)
    localStorage.setItem('userAvatar', croppedImageData);
    
    // Close modal
    document.getElementById('avatar-crop-modal').classList.remove('active');
    
    // Show success notification
    showNotification('Profile picture updated successfully');
}

// Function to upload avatar to server (placeholder)
function uploadAvatarToServer(imageData) {
    // Convert base64 to blob
    const blob = dataURItoBlob(imageData);
    
    // Create form data
    const formData = new FormData();
    formData.append('avatar', blob, 'avatar.jpg');
    
    // Send to server
    fetch('upload_avatar.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Profile picture uploaded successfully');
        } else {
            showNotification('Failed to upload profile picture', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('An error occurred while uploading', 'error');
    });
}

// Helper function to convert data URI to Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeString });
}

// Logout handling
document.querySelector('.logout').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Clear local storage
    localStorage.clear();
    
    // Redirect to login page
    window.location.href = 'index.html';
});