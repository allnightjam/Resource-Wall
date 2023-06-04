const searchInput = document.getElementById('search-text');
const searchResults = document.querySelectorAll(".resource-item");

searchInput.addEventListener("input", function(event) {
  const searchTerm = event.target.value.toLowerCase();
  searchResults.forEach(function(resource) {
    const resourceText = resource.innerText.toLowerCase();
    if (resourceText.includes(searchTerm)) {
      resource.classList.remove("hidden");
    } else {
      resource.classList.add("hidden");
    }
  });
});

