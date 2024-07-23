apiUrl = "";
userRole = "agent"; // Change this to 'agent', 'trader', or 'admin' as needed

const loadHTML = async (url, containerId) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    document.getElementById(containerId).innerHTML = text;
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
};

const initializeScripts = () => {
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const profileLinks = document.querySelectorAll('.nav-link.collapsed[href="#"]'); // Select profile links with href="#"
  const profileDropdown = document.getElementById("profileDropdown");
  const dropdownMenu = document.getElementById("dropdownMenu");
  profileDropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click", function (event) {
    if (!profileDropdown.contains(event.target)) {
      dropdownMenu.style.display = "none";
    }
  });

  sidebarToggle?.addEventListener("click", function () {
    toggleSidebar();
  });

  document.addEventListener("click", function (event) {
    profileLinks.forEach((profileLink) => {
      const submenu = profileLink.nextElementSibling; // Select the submenu associated with the profile link
      if (
        !profileLink.contains(event.target) &&
        !submenu.contains(event.target)
      ) {
        submenu.style.display = "none";
        submenu.classList.remove("show");
      }
    });
  });

  profileLinks.forEach((profileLink) => {
    const submenu = profileLink.nextElementSibling; // Select the submenu associated with the profile link
    const chevronIcon = profileLink.querySelector(".bi-chevron-down");
    profileLink?.addEventListener("click", function (event) {
      event.preventDefault();
      if (submenu.style.display === "block") {
        submenu.style.display = "none";
        submenu.classList.remove("show");
      } else {
        submenu.style.display = "block";
        submenu.classList.add("show");
      }
      chevronIcon?.classList.toggle("rotated");
    });
  });

  // Check window width on load and resize
  checkWindowWidth();
  window.addEventListener("resize", checkWindowWidth);

  // Highlight active link
  highlightActiveLink();
};

const toggleSidebar = () => {
  const sidebars = document.querySelectorAll(".sidebar");
  const mainContent = document.getElementById("main-content");

  sidebars.forEach((sidebar) => {
    if (sidebar?.classList.contains("active")) {
      sidebar.classList.remove("active");
      sidebar.classList.add("hidden");
      mainContent?.classList.add("full-width");
    } else {
      sidebar?.classList.add("active");
      sidebar.classList.remove("hidden");
      mainContent?.classList.remove("full-width");
    }
  });
};

const checkWindowWidth = () => {
  const sidebars = document.querySelectorAll(".sidebar");
  if (window.innerWidth <= 1199) {
    sidebars.forEach((sidebar) => {
      sidebar?.classList.remove("active");
      sidebar.classList.add("hidden");
    });
  } else {
    sidebars.forEach((sidebar) => {
      sidebar?.classList.add("active");
      sidebar.classList.remove("hidden");
    });
  }
};

const highlightActiveLink = () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    const linkImg = link.querySelector(".nav-side-img");

    if (linkHref === currentPage) {
      link.classList.add("active");
      if (linkImg) {
        linkImg.classList.add("active");
      }
    } else {
      link.classList.remove("active");
      if (linkImg) {
        linkImg.classList.remove("active");
      }
    }
  });

  // Show profile nav-content if on details or password page
  if (["details.html", "password.html"].includes(currentPage)) {
    const profileLinks = document.querySelectorAll(
      '.nav-link.collapsed[href="#"]'
    );
    profileLinks.forEach((profileLink) => {
      const submenu = profileLink.nextElementSibling;
      const chevronIcon = profileLink.querySelector(".bi-chevron-down");
      submenu.style.display = "block";
      submenu.classList.add("show");
      chevronIcon?.classList.add("rotated");
    });
  }
};

const initializeAll = async () => {
  await loadHTML("header.html", "header-container");
  await loadHTML("sidebar.html", "sidebar-container");

  // Set the user type and manage sidebar visibility
  setuserRole(userRole);

  // Initialize scripts after loading HTML content
  initializeScripts();
};

function setuserRole(userRole) {
  const agentSidebar = document.getElementById("agent-sidebar");
  const traderSidebar = document.getElementById("trader-sidebar");
  const adminSidebar = document.getElementById("admin-sidebar");

  const agentOnlyElements = document.querySelectorAll(".agent-only");
  const traderOnlyElements = document.querySelectorAll(".trader-only");
  const adminOnlyElements = document.querySelectorAll(".admin-only");
  const leftIcons = document.querySelectorAll(".left-icon"); // Select all left icons
  const accordionToggles = document.querySelectorAll(".accordion-toggle");

  if (agentSidebar && traderSidebar && adminSidebar) {
    if (userRole === "agent") {
      agentSidebar.style.display = "block";
      traderSidebar.style.display = "none";
      adminSidebar.style.display = "none";
      agentOnlyElements.forEach((item) => (item.style.display = "block"));
      traderOnlyElements.forEach((item) => (item.style.display = "none"));
      adminOnlyElements.forEach((item) => (item.style.display = "none"));
      accordionToggles.forEach((toggle) =>
        toggle.classList.add("agent-accordion")
      );
    } else if (userRole === "trader") {
      agentSidebar.style.display = "none";
      traderSidebar.style.display = "block";
      adminSidebar.style.display = "none";
      agentOnlyElements.forEach((item) => (item.style.display = "none"));
      traderOnlyElements.forEach((item) => (item.style.display = "block"));
      adminOnlyElements.forEach((item) => (item.style.display = "none"));
      accordionToggles.forEach((toggle) =>
        toggle.classList.remove("agent-accordion")
      );
    } else if (userRole === "admin") {
      agentSidebar.style.display = "none";
      traderSidebar.style.display = "none";
      adminSidebar.style.display = "block";
      agentOnlyElements.forEach((item) => (item.style.display = "none"));
      traderOnlyElements.forEach((item) => (item.style.display = "none"));
      adminOnlyElements.forEach((item) => (item.style.display = "block"));
      leftIcons.forEach((icon) => (icon.style.display = "none")); // Hide left icons
      accordionToggles.forEach((toggle) =>
        toggle.classList.remove("agent-accordion")
      );
    }
  } else {
    console.error("One or more sidebar elements are not found in the DOM.");
  }
}

function handleLogin(event) {
  console.log("inside ");
  event.preventDefault(); // Prevent the default form submission

  // Get the form data
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Log the form data (for demonstration purposes)
  console.log("Email:", email);
  console.log("Password:", password);

  $.ajax({
    url: apiUrl + "/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email: email, password: password }),
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

function handleSignup(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form data
  const formData = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#email").val(),
    contactNumber: $("#contactNumber").val(),
    password: $("#password").val(),
    confirmPassword: $("#confirmPassword").val(),
  };

  console.log("fromdata", formData);

  // Make the AJAX call
  $.ajax({
    url: "/signup", // Replace with your API endpoint
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function (response) {
      // Handle the response from the server
      console.log(response);
      // You can handle the response here, e.g., redirect to another page
    },
    error: function (xhr, status, error) {
      // Handle errors
      console.error("Error:", error);
    },
  });
}
