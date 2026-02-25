/* ===============================================
   CONTACT FORM HANDLER
   =============================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate required fields
    const required = form.querySelectorAll("[required]");
    let valid = true;

    required.forEach((field) => {
      clearError(field);
      const val = field.value.trim();

      if (!val) {
        showError(field, "This field is required");
        valid = false;
      } else if (
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ) {
        showError(field, "Please enter a valid email");
        valid = false;
      }
    });

    if (!valid) return;

    // Loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate send — replace with real API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      PortfolioApp.notify("Message sent successfully!", "success");
      form.reset();
    } catch {
      PortfolioApp.notify("Failed to send. Please try again.", "error");
    } finally {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    }
  });

  // Live validation on blur
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => {
      if (field.hasAttribute("required") && !field.value.trim()) {
        showError(field, "This field is required");
      }
    });
    field.addEventListener("input", () => clearError(field));
  });

  function showError(field, msg) {
    field.classList.add("error");
    let span = field.parentNode.querySelector(".field-error");
    if (!span) {
      span = document.createElement("span");
      span.className = "field-error";
      field.parentNode.appendChild(span);
    }
    span.textContent = msg;
  }

  function clearError(field) {
    field.classList.remove("error");
    field.parentNode.querySelector(".field-error")?.remove();
  }
});
