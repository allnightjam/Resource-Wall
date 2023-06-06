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
