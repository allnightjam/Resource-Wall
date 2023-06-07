
$('.start-radio').on("change", function(event) {
  event.preventDefault();
  const data = $('input[name=rating]:checked').val();
  console.log(data);

  $.post("/rating", data)
    .then(() => {
      console.log("rating successful!");
    })
    .catch(function() {
      console.log("error occured");
    });
});
