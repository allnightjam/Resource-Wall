//Client facing scripts here
$('.fa-heart').click(function() {
  //var val = parseInt($(this).text(), 10);

  const $curHeartIcon = $(this);

  const $curForm = $curHeartIcon.closest('form');
  const $curResourceInput = $curForm.find('input');
  const $heartNum = $curForm.find('span');

  let val = $heartNum.html();
  let resourceID = $curResourceInput.val();
  console.log(Number(val));
  console.log(Number(resourceID));


  $(this).toggleClass('is-liked');

  if ($(this).hasClass('is-liked')) {
    $(this).addClass('fa-solid');
    $(this).removeClass('fa-regular');
    val++
    //likesSubmitForm(Number(resourceID));
  } else {
    $(this).addClass('fa-regular');
    $(this).removeClass('fa-solid');
    val--
    // User removed his like
    //unLikesSubmitForm(Number(resourceID));
  }

  $($heartNum).text(val);
});

// Get the like icon element

const  likesSubmitForm = function(resourceId) {
  // Submit the form corresponding to the clicked icon
  document.getElementById('add-likes-form-' + resourceId).submit();
};

