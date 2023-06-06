const searchInput = document.getElementById('search-text');
const searchResults = document.querySelectorAll(".resource-item");

searchInput.addEventListener("input", function(event) {
  const searchTerm = event.target.value.toLowerCase();
  searchResults.forEach(function(resource) {
    console.log("resource:", resource);
    const resourceText = resource.innerText.toLowerCase();
    if (resourceText.includes(searchTerm)) {
      resource.classList.remove("hidden");
    } else {
      resource.classList.add("hidden");
    }
  });
});

// <%= resources[id].title%>

// const searchInput = document.getElementById('search-text');
// const searchResults = document.querySelectorAll(".resource-item");
// let database = [];

// searchInput.addEventListener("input", function(event) {
//   const searchTerm = event.target.value.toLowerCase();

//   const searchQuery = `SELECT * FROM resources WHERE resource_text LIKE '%${searchTerm}%'`;

//   performDatabaseSearch(searchQuery, function(results) {
//     searchResults.forEach(function(resource) {
//       const resourceText = resource.innerText.toLowerCase();
//       const resourceId = resource.dataset.id;

//       const isResourceInDatabase = results.some(function(result) {
//         return result.id === resourceId;
//       });

//       if (resourceText.includes(searchTerm) && isResourceInDatabase) {
//         resource.classList.remove("hidden");
//       } else {
//         resource.classList.add("hidden");
//       }
//     })
//   })

// })
