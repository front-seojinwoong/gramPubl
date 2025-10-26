$(document).ready(function () {
  // GNB 2depth Tt fadeIn/fadeOut
  $(".depth1 > li.has-sub").hover(
    function () {
      $(this).find(".depth2").stop().fadeIn(400);
    },
    function () {
      $(this).find(".depth2").stop().fadeOut(400);
    }
  );
});
