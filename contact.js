document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (name && email && message) {
        const formData = {
          name: name,
          email: email,
          message: message,
          timestamp: new Date().toISOString()
        };
  
        // Get existing messages or create a new array
        let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  
        // Add new message
        messages.push(formData);
  
        // Save back to localStorage
        localStorage.setItem("contactMessages", JSON.stringify(messages));
  
        alert("✅ Your message has been saved locally!");
  
        form.reset(); // Clear form after saving
      } else {
        alert("⚠️ Please fill out all fields.");
      }
    });
  });
  