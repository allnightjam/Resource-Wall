// Client facing scripts here
// Get the like icon element

const  likesSubmitForm = function(resourceId) {
  // Submit the form corresponding to the clicked icon
  document.getElementById('add-likes-form-' + resourceId).submit();
};