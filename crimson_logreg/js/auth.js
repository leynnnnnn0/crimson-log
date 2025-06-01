document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const validationPatterns = {
    name: /^[A-Za-z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    contact: /^09\d{9}$/,
    username: /^[a-zA-Z0-9_]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const validationMessages = {
    firstName: {
      required: "First name is required",
      pattern: "First name should only contain letters and spaces",
      minLength: "First name must be at least 2 characters long",
    },
    middleName: {
      pattern: "Middle name should only contain letters and spaces",
    },
    lastName: {
      required: "Last name is required",
      pattern: "Last name should only contain letters and spaces",
      minLength: "Last name must be at least 2 characters long",
    },
    contact: {
      required: "Contact number is required",
      pattern: "Please enter a valid Philippine mobile number (09XXXXXXXXX)",
    },
    email: {
      required: "Email address is required",
      pattern: "Please enter a valid email address",
    },
    address: {
      required: "Address is required",
      minLength: "Please provide a complete address (minimum 10 characters)",
    },
    username: {
      required: "Username is required",
      pattern: "Username can only contain letters, numbers, and underscores",
      minLength: "Username must be at least 5 characters long",
      maxLength: "Username cannot exceed 20 characters",
    },
    password: {
      required: "Password is required",
      pattern:
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
    },
    confirmPassword: {
      required: "Please confirm your password",
      match: "Passwords do not match",
    },
  };

  // Validation functions
  function validateField(field, value, fieldName) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = "";

    errorElement.textContent = "";
    field.classList.remove("invalid", "valid");

    if (fieldName !== "middleName" && (!value || value.trim() === "")) {
      isValid = false;
      errorMessage = validationMessages[fieldName].required;
    } else if (fieldName === "middleName" && value && value.trim() !== "") {
      if (!validationPatterns.name.test(value.trim())) {
        isValid = false;
        errorMessage = validationMessages[fieldName].pattern;
      }
    } else if (value && value.trim() !== "") {
      switch (fieldName) {
        case "firstName":
        case "lastName":
          if (value.trim().length < 2) {
            isValid = false;
            errorMessage = validationMessages[fieldName].minLength;
          } else if (!validationPatterns.name.test(value.trim())) {
            isValid = false;
            errorMessage = validationMessages[fieldName].pattern;
          }
          break;

        case "contact":
          if (!validationPatterns.contact.test(value.trim())) {
            isValid = false;
            errorMessage = validationMessages[fieldName].pattern;
          }
          break;

        case "email":
          if (!validationPatterns.email.test(value.trim())) {
            isValid = false;
            errorMessage = validationMessages[fieldName].pattern;
          }
          break;

        case "address":
          if (value.trim().length < 10) {
            isValid = false;
            errorMessage = validationMessages[fieldName].minLength;
          }
          break;

        case "username":
          if (value.trim().length < 5) {
            isValid = false;
            errorMessage = validationMessages[fieldName].minLength;
          } else if (value.trim().length > 20) {
            isValid = false;
            errorMessage = validationMessages[fieldName].maxLength;
          } else if (!validationPatterns.username.test(value.trim())) {
            isValid = false;
            errorMessage = validationMessages[fieldName].pattern;
          }
          break;

        case "password":
          if (!validationPatterns.password.test(value)) {
            isValid = false;
            errorMessage = validationMessages[fieldName].pattern;
          }
          break;

        case "confirmPassword":
          const passwordField = document.getElementById("password");
          if (value !== passwordField.value) {
            isValid = false;
            errorMessage = validationMessages[fieldName].match;
          }
          break;
      }
    }

    if (!isValid) {
      errorElement.textContent = errorMessage;
      field.classList.add("invalid");
    } else if (value && value.trim() !== "") {
      field.classList.add("valid");
    }

    return isValid;
  }

  if (registerForm) {
    const fields = [
      { element: document.getElementById("first-name"), name: "firstName" },
      { element: document.getElementById("middle-name"), name: "middleName" },
      { element: document.getElementById("last-name"), name: "lastName" },
      { element: document.getElementById("contact"), name: "contact" },
      { element: document.getElementById("email"), name: "email" },
      { element: document.getElementById("address"), name: "address" },
      { element: document.getElementById("username"), name: "username" },
      { element: document.getElementById("password"), name: "password" },
      {
        element: document.getElementById("confirm-password"),
        name: "confirmPassword",
      },
    ];

    fields.forEach((field) => {
      if (field.element) {
        field.element.addEventListener("blur", function () {
          validateField(field.element, field.element.value, field.name);
        });

        field.element.addEventListener("input", function () {
          const errorElement = document.getElementById(
            `${field.element.id}-error`
          );
          if (errorElement.textContent) {
            setTimeout(() => {
              validateField(field.element, field.element.value, field.name);
            }, 500);
          }
        });
      }
    });

    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isFormValid = true;

      fields.forEach((field) => {
        if (field.element) {
          const fieldValid = validateField(
            field.element,
            field.element.value,
            field.name
          );
          if (!fieldValid) {
            isFormValid = false;
          }
        }
      });

      if (!isFormValid) {
        showError("Please correct the errors above before submitting.");
        return;
      }

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
      }

      showSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (!username || !password) {
        showError("Please fill in all required fields.");
        return;
      }

      showSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    });
  }

  function showError(message) {
    const existingAlerts = document.querySelectorAll(".alert");
    existingAlerts.forEach((alert) => alert.remove());

    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-error";
    errorDiv.textContent = message;

    const form = document.querySelector("form");
    form.parentNode.insertBefore(errorDiv, form);

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  function showSuccess(message) {
    const existingAlerts = document.querySelectorAll(".alert");
    existingAlerts.forEach((alert) => alert.remove());

    const successDiv = document.createElement("div");
    successDiv.className = "alert alert-success";
    successDiv.textContent = message;

    const form = document.querySelector("form");
    form.parentNode.insertBefore(successDiv, form);

    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
});
