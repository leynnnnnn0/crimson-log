document.addEventListener("DOMContentLoaded", function () {
  // Update current date and time
  updateDateTime();
  setInterval(updateDateTime, 1000); // Update every second for more accurate time display

  // Sidebar toggle functionality
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");

      // Store sidebar state in memory (not localStorage as it's not supported)
      window.sidebarHidden = sidebar.classList.contains("hidden");
    });

    // Check if sidebar state was previously stored in memory
    if (window.sidebarHidden) {
      sidebar.classList.add("hidden");
    }
  }

  // User menu functionality
  const userMenuTrigger = document.getElementById("user-menu-trigger");
  const userMenu = document.getElementById("user-menu");

  if (userMenuTrigger && userMenu) {
    userMenuTrigger.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event from bubbling up
      userMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !userMenuTrigger.contains(event.target) &&
        !userMenu.contains(event.target)
      ) {
        userMenu.classList.remove("active");
      }
    });
  }

  // Load user data from memory storage (replacing localStorage functionality)
  loadUserData();

  // Add hover effects to cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    });
  });

  // Add logout handler
  const logoutButton = document.querySelector(".logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Clear any stored user data from memory
      window.userData = null;
      window.userAvatar = null;
      window.sidebarHidden = false;

      // In a real application, you would redirect to login page
      // window.location.href = 'login.html';
      alert("Logout functionality would redirect to login page");
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 992) {
      const sidebar = document.getElementById("sidebar");
      const sidebarToggle = document.getElementById("sidebar-toggle");

      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        !sidebarToggle.contains(event.target)
      ) {
        sidebar.classList.add("hidden");
        window.sidebarHidden = true;
      }
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth > 992 && sidebar) {
      // Reset sidebar state on desktop
      sidebar.classList.remove("hidden");
      window.sidebarHidden = false;
    }
  });
});

function updateDateTime() {
  const now = new Date();

  // Format date: Month Day, Year - Weekday
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const formattedDate = now.toLocaleDateString("en-US", dateOptions);

  // Format time: HH:MM:SS AM/PM for more precise time display
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

  // Update elements
  const currentDateElement = document.getElementById("current-date");
  const currentTimeElement = document.getElementById("current-time");

  if (currentDateElement) {
    // Format as "May 31, 2025 - Saturday"
    const parts = formattedDate.split(",");
    if (parts.length >= 2) {
      currentDateElement.textContent = `${parts[0]},${
        parts[1]
      } - ${parts[2].trim()}`;
    } else {
      currentDateElement.textContent = formattedDate;
    }
  }

  if (currentTimeElement) {
    // Format as "09:12:35 PM"
    currentTimeElement.textContent = formattedTime;
  }
}

// Function to load user data from memory storage (replacing localStorage)
function loadUserData() {
  // In a real application, this would load from localStorage or an API
  // For demo purposes, we'll use some default data stored in memory

  const personalInfo = window.userData || {
    firstName: "John",
    lastName: "Doe",
  };

  const userAvatar = window.userAvatar || null;
  const contactInfo = window.contactInfo || {
    email: "john.doe@example.com",
  };

  // Update user name in welcome section and menu
  const userNameElements = document.querySelectorAll(
    "#user-name, #menu-user-name"
  );
  const userEmailElement = document.querySelector(".user-email");
  const avatarElements = document.querySelectorAll(".avatar, .menu-avatar");

  if (personalInfo) {
    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
    userNameElements.forEach((element) => {
      if (element) {
        // Remove exclamation mark if it exists in the welcome message
        if (element.id === "user-name") {
          element.textContent = fullName + "!";
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
    avatarElements.forEach((element) => {
      if (element) element.src = userAvatar;
    });
  }
}
