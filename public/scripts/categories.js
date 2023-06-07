$(() => {
  console.log("in public-scripts-categories ");
  $.get('/categories')
    .done(function(data) {
      const select = $('#category-select');
      // Loop through the data array and create <option> elements
      $.each(data, function(index, value) {
        // Create a new <option> element
        let option = $('<option></option>');
        // Set the value and text of the option
        option.val(value.id);
        option.text(value.name);
        // Append the option to the select element
        select.append(option);
      });

    })
    .fail(function(error) {
      console.error(error);
    });
});


// const categoryButtons = document.querySelectorAll(".category-title")

// categoryButtons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     const selectedCategory = event.target.dataset.category;

//     getCategory(selectedCategory)
//       .then((results) => {
//         console.log(results);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   });
// });

/////////////
// window.addEventListener('DOMContentLoaded', (event) => {
//   const categoryList = document.getElementById("category-list");
//   const articles = document.getElementById('articles').getElementsByTagName('article');

//   categoryList.addEventListener('click', (event) => {
//     if (event.target.nodeName === 'LI') {
//       const selectedCategory = event.target.getAttribute("data-category");
//       Array.from(categoryList.children).forEach((item) => {
//         item.classList.remove("active");
//       });
//       Array.from(articles).forEach((article) => {
//         const articleCategory = article.getAttribute("data-category");
//         if (selectedCategory === "all" || selectedCategory === articleCategory) {
//           article.style.display = "block";
//         } else {
//           article.style.display = "none";
//         }
//       });
//       event.target.classList.add("active");
//     }
//   });

// $(() => {
//   console.log("in public-scripts-categories ");
//   $.get('/categories')
//     .done(function(data) {
//       const select = $('#category-select');
//       // Loop through the data array and create <option> elements
//       $.each(data, function(index, value) {
//         // Create a new <option> element
//         let option = $('<option></option>');
//         // Set the value and text of the option
//         option.val(value.id);
//         option.text(value.name);
//         // Append the option to the select element
//         select.append(option);
//       });

//     })
//     .fail(function(error) {
//       console.error(error);
//     });

// });
