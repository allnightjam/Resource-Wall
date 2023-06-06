
$('.start-radio').on("change", function(event) {
  event.preventDefault();
  // const data = $('input[name=rating]:checked').val();
  const data = {rating:$('input[name=rating]:checked').val(), 'resource-id':$('#rating-resource-id').val()};

  $.post("/rating", data)
    .then(() => {
      console.log("rating successful!");
    })
    .catch(function() {
      console.log("error occured");
    });
});

// $(() => {
//   let isLiked = false;
//   $('.fa-heart').on("click", function (event) {
//     event.preventDefault();
//     isLiked = !isLiked; // Toggle the liked state
//     if (isLiked) {
//       this.classList.add('liked');
//     } else {
//       this.classList.remove('liked');
//     }
  
//     // Perform further actions based on the liked/unliked state
//     if (isLiked) {
//       // Code for when the icon is liked
//       console.log('Icon is liked');
//     } else {
//       // Code for when the icon is unliked
//       console.log('Icon is unliked');
//     }
//     $.post("/addlikes", isLiked)
//       .then(() => {

//         console.log("liked successful!");
//       })
//       .catch(function () {
//         console.log("error occured");
//       });
//   });
// });

