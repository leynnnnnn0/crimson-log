document.addEventListener('DOMContentLoaded', function() {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Function to update progress status text based on completed steps
    function updateProgressStatus() {
        const completedSteps = document.querySelectorAll('.timeline-item.completed').length;
        const totalSteps = timelineItems.length;
        const statusElement = document.querySelector('.status');
        
        if (completedSteps === 0) {
            statusElement.textContent = 'Not Started';
            statusElement.className = 'status pending';
        } else if (completedSteps === totalSteps) {
            statusElement.textContent = 'Completed';
            statusElement.className = 'status completed';
        } else {
            statusElement.textContent = 'In Progress';
            statusElement.className = 'status processing';
        }
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
    
    // Initialize progress status
    updateProgressStatus();
    
    // Add smooth hover effect to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active') && !this.classList.contains('completed')) {
                this.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});