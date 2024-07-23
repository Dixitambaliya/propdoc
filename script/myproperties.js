document.addEventListener("DOMContentLoaded", function () {
  const toggles = document.querySelectorAll(".accordion-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const arrowIcon = this.querySelector(".arrow-icon img");

      // Hide all other contents
      document
        .querySelectorAll(".accordion-content")
        .forEach((otherContent) => {
          if (otherContent !== content) {
            otherContent.classList.remove("show");
            // Remove rotation from other arrow icons
            const otherArrowIcon =
              otherContent.previousElementSibling.querySelector(
                ".arrow-icon img"
              );
            if (otherArrowIcon) {
              otherArrowIcon.classList.remove("rotated");
            }
          }
        });

      // Toggle the current content
      content.classList.toggle("show");
      // Toggle the rotation of the arrow icon
      arrowIcon.classList.toggle("rotated");
    });
  });

  const paginationLinks = document.querySelectorAll(".pagination a.page");
  const pageContents = document.querySelectorAll(".page-content");

  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all pagination links
      paginationLinks.forEach((link) => link.classList.remove("active"));

      // Add active class to the clicked pagination link
      this.classList.add("active");

      // Get the page number from the data-page attribute
      const pageNumber = this.getAttribute("data-page");

      // Hide all page contents
      pageContents.forEach((content) => content.classList.remove("active"));

      // Show the selected page content
      document.getElementById(`page${pageNumber}`).classList.add("active");
    });
  });
});
