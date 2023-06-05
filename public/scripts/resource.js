
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
