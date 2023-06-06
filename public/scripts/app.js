$(function() {
  //Client facing scripts here
  $('.fa-heart').click(function() {
    //var val = parseInt($(this).text(), 10);
    console.log("click heart");

    const $curHeartIcon = $(this);

    const $curForm = $curHeartIcon.closest('form');
    const $curResourceInput = $curForm.find('#hidden-resource-id');
    // const $curResourceLikedInput = $curForm.find('#hidden-resource-liked');
    const $heartNum = $curForm.find('span');

    let val = $heartNum.html();
    let isLiked = false;
    let resourceID = $curResourceInput.val();
    console.log(Number(val));
    console.log("resourceID",Number(resourceID));
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
    console.log("like button was clicked ", isLiked);
    if ($(this).hasClass('main-page')) {
      $.post('/addlikes', { 'resource-id': resourceID, 'isLiked': isLiked })
        .done(() => {
          console.log("click heart received from main page!!!");
          // Handle the success response from the server
          console.log('add likes success');
        })
        .fail(function (error) {
          console.log('Error:', error);
        });
    }
    
    if ($(this).hasClass('detail-page')) {
      console.log("detail page");
      $.post(`/addlikes/${resourceID}`, { 'resource-id': resourceID, 'isLiked': isLiked })
        .done(() => {
          console.log("click heart received from detail page!!!");
          // Handle the success response from the server
          console.log('add likes success in detail page');
        })
        .fail(function (error) {
          console.log('Error:', error);
        });
    }
    
    if ($(this).hasClass('my-page')) {
      console.log("my page");
      $.post('/addlikesOnMyresource', { 'resource-id': resourceID, 'isLiked': isLiked })
        .done(() => {
          console.log("click heart received from my page!!!");
          // Handle the success response from the server
          console.log('add likes success in my page');
        })
        .fail(function (error) {
          console.log('Error:', error);
        });
    }
  });
});
