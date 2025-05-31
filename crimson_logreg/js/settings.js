document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const navItems = document.querySelectorAll('.settings-nav li');
    const tabs = document.querySelectorAll('.settings-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Get the tab to show
            const tabId = this.getAttribute('data-tab') + '-tab';
            
            // Hide all tabs
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Show the selected tab
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Theme Selection
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all theme options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked theme option
            this.classList.add('active');
            
            // Get the selected theme
            const theme = this.getAttribute('data-theme');
            
            // Apply the theme (in a real app, you would save this preference)
            applyTheme(theme);
            
            // Show notification
            showNotification('Theme Updated', 'Your theme preference has been saved.', 'success');
        });
    });
    
    // Font Size Slider
    const fontSizeSlider = document.getElementById('font-size-slider');
    
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', function() {
            const fontSize = this.value;
            applyFontSize(fontSize);
        });
        
        fontSizeSlider.addEventListener('change', function() {
            // Show notification when user stops dragging
            showNotification('Font Size Updated', 'Your font size preference has been saved.', 'success');
        });
    }
    
    // Save Account Settings
    const saveAccountBtn = document.getElementById('save-account');
    
    if (saveAccountBtn) {
        saveAccountBtn.addEventListener('click', function() {
            showNotification('Account Updated', 'Your account information has been saved.', 'success');
        });
    }
    
    // Save Language Settings
    const saveLanguageBtn = document.getElementById('save-language');
    
    if (saveLanguageBtn) {
        saveLanguageBtn.addEventListener('click', function() {
            showNotification('Language Updated', 'Your language preference has been saved.', 'success');
        });
    }
    
    // Delete Account Confirmation
    const deleteAccountBtn = document.getElementById('delete-account');
    const confirmationModal = document.getElementById('confirmation-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalMessage = document.getElementById('modal-message');
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            modalMessage.textContent = 'Are you sure you want to delete your account? This action cannot be undone.';
            confirmationModal.classList.add('active');
            
            // Set up the confirm button for this specific action
            modalConfirm.onclick = function() {
                confirmationModal.classList.remove('active');
                showNotification('Account Deleted', 'Your account has been successfully deleted.', 'success');
                
                // Redirect to login page after a delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            };
        });
    }
    
    // Modal Close Button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
        });
    }
    
    // Modal Cancel Button
    if (modalCancel) {
        modalCancel.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
        });
    }
    
    // Toggle Switches
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id || 'setting';
            const state = this.checked ? 'enabled' : 'disabled';
            showNotification('Setting Updated', `${settingName.replace('-', ' ')} has been ${state}.`, 'success');
            
            // Apply specific settings
            if (settingName === 'high-contrast') {
                applyHighContrast(this.checked);
            } else if (settingName === 'reduce-animations') {
                applyReducedAnimations(this.checked);
            }
        });
    });
    
    // Notification Close Button
    const notificationClose = document.querySelector('.notification-close');
    
    if (notificationClose) {
        notificationClose.addEventListener('click', function() {
            document.getElementById('notification').classList.remove('show');
        });
    }
    
    // Detect Browser Info
    const browserInfoElement = document.getElementById('browser-info');
    
    if (browserInfoElement) {
        browserInfoElement.textContent = getBrowserInfo();
    }
    
    // Helper Functions
    function applyTheme(theme) {
        console.log(`Theme set to: ${theme}`);
        
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    function applyFontSize(size) {
        const fontSize = 14 + (size - 3) * 2; // Base size is 14px, each step is 2px
        document.documentElement.style.fontSize = `${fontSize}px`;
    }
    
    function applyHighContrast(enabled) {
        if (enabled) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }
    
    function applyReducedAnimations(enabled) {
        if (enabled) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
    
    function showNotification(title, message, type = 'success') {
        const notification = document.getElementById('notification');
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
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown";
        let browserVersion = "";
        
        if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Firefox";
            browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Chrome") > -1) {
            browserName = "Chrome";
            browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = "Safari";
            browserVersion = userAgent.match(/Version\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
            browserName = "Internet Explorer";
            browserVersion = userAgent.match(/(?:MSIE |rv:)([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Edge") > -1) {
            browserName = "Edge";
            browserVersion = userAgent.match(/Edge\/([0-9.]+)/)[1];
        }
        
        return `${browserName} ${browserVersion}`;
    }
});