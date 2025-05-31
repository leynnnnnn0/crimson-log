document.addEventListener('DOMContentLoaded', function() {
    // User menu toggle
    const userMenuTrigger = document.getElementById('user-menu-trigger');
    const userMenu = document.getElementById('user-menu');

    userMenuTrigger.addEventListener('click', () => {
        userMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenuTrigger.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.classList.remove('active');
        }
    });

    // Function to update progress status
    function updateProgress(status, currentStep) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            if (index < currentStep) {
                item.classList.add('completed');
                item.classList.remove('active');
            } else if (index === currentStep) {
                item.classList.add('active');
                item.classList.remove('completed');
            } else {
                item.classList.remove('completed', 'active');
            }
        });

        // Update status badge
        const statusBadge = document.querySelector('.request-status');
        statusBadge.className = 'request-status ' + status.toLowerCase();
        statusBadge.textContent = status;
    }

    // Example: Update progress (you can call this with actual data)
    // updateProgress('Pending', 1); // 1 is the current step (0-based index)
});