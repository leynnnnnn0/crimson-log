document.addEventListener('DOMContentLoaded', function() {
    // Update current date and time
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second for more accurate time display
    
    // User menu functionality
    const userMenuTrigger = document.getElementById('user-menu-trigger');
    const userMenu = document.getElementById('user-menu');
    
    if (userMenuTrigger && userMenu) {
        userMenuTrigger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            userMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!userMenuTrigger.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.remove('active');
            }
        });
    }
    
    // Load user data from localStorage
    loadUserData();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add logout handler
    document.querySelector('.logout').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear any stored user data
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = 'login.html';
    });
});

function updateDateTime() {
    const now = new Date();
    
    // Format date: Month Day, Year - Weekday
    const dateOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
    };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    
    // Format time: HH:MM:SS AM/PM for more precise time display
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    
    // Update elements
    const currentDateElement = document.getElementById('current-date');
    const currentTimeElement = document.getElementById('current-time');
    
    if (currentDateElement) {
        // Format as "May 9, 2025 - Friday"
        const parts = formattedDate.split(',');
        if (parts.length >= 2) {
            currentDateElement.textContent = `${parts[0]},${parts[1]} - ${parts[2].trim()}`;
        } else {
            currentDateElement.textContent = formattedDate;
        }
    }
    
    if (currentTimeElement) {
        // Format as "09:12:35 PM"
        currentTimeElement.textContent = formattedTime;
    }
}

// Function to load user data from localStorage
function loadUserData() {
    // Get user name from localStorage
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    const userAvatar = localStorage.getItem('userAvatar');
    const contactInfo = JSON.parse(localStorage.getItem('contactInfo'));
    
    // Update user name in welcome section and menu
    const userNameElements = document.querySelectorAll('#user-name, #menu-user-name');
    const userEmailElement = document.querySelector('.user-email');
    const avatarElements = document.querySelectorAll('.avatar, .menu-avatar');
    
    if (personalInfo) {
        const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
        userNameElements.forEach(element => {
            if (element) {
                // Remove exclamation mark if it exists in the welcome message
                if (element.id === 'user-name') {
                    element.textContent = fullName + '!';
                } else {
                    element.textContent = fullName;
                }
            }
        });
    }
    
    // Update user email if available
    if (contactInfo && contactInfo.email && userEmailElement) {
        userEmailElement.textContent = contactInfo.email;
    }
    
    // Update avatar if available
    if (userAvatar) {
        avatarElements.forEach(element => {
            if (element) element.src = userAvatar;
        });
    }
}