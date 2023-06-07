//Client facing scripts here
$(document).ready(function(){
  $('.category-link').click(function(){
    console.log('---clicked category--');
    $('.category-link a').removeClass("category-active");
    $(this).addClass("category-active");
});
});


// Get the like icon element

const  likesSubmitForm = function(resourceId) {
  // Submit the form corresponding to the clicked icon
  document.getElementById('add-likes-form-' + resourceId).submit();
};
