$(() => {
  $('#add-resource-form').on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    
    $.post("/addResource", data)
      .then(() => {
        console.log("add resource successful!");
      })
      .catch(function() {
        console.log("error occured");
      });
  });
});