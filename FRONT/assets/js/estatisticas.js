 $(function(){

    $("#dropdown-menu-mes").on('click', 'a', function(){
      $(".btn:first-child").text($(this).text());
      $(".btn:first-child").val($(this).text());
   });

});