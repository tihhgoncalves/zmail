$(document).ready(function(){


  $('#consultar').click(function(){

    var url = $('#url').val();

    if(url.length > 0) {
      consultaURL(url);
    } else {
      alert('digite uma URL');
    }

  });

});


function consultaURL(url){

  console.log('Consultando URL: '. url)

  $.ajax({
    method: "POST",
    url: "ajax.urls.php",
    data: { url: url }
  })
    .done(function( r ) {
      var val = $('#urls').val();

      if(val.length > 0)
        val += "\r\n";

      $('#urls').val(val + r);

    });

}