$(function() {
  //Client facing scripts here
  $('.fa-heart').click(function() {
    //var val = parseInt($(this).text(), 10);

    const $curHeartIcon = $(this);

    const $curForm = $curHeartIcon.closest('form');
    const $curResourceInput = $curForm.find('#hidden-resource-id');
    // const $curResourceLikedInput = $curForm.find('#hidden-resource-liked');
    const $heartNum = $curForm.find('span');

    let val = $heartNum.html();
    let isLiked = false;
    let resourceID = $curResourceInput.val();
    console.log(Number(val));
    console.log(Number(resourceID));
    // console.log($curResourceLikedInput.val());


    $(this).toggleClass('is-liked');

    if ($(this).hasClass('is-liked')) {
      $(this).addClass('fa-solid');
      $(this).removeClass('fa-regular');
      isLiked = true;
      val++;
    } else {
      $(this).addClass('fa-regular');
      $(this).removeClass('fa-solid');
      val--;
      isLiked = false;
      // User removed his like
    }

    $($heartNum).text(val);

    $.post('/addlikes', { 'resource-id': resourceID, 'isLiked': isLiked })
      .done(() => {
        // Handle the success response from the server
        console.log('add likes success');
      })
      .fail(function(error) {
        console.log('Error:', error);
      });
  });

});
