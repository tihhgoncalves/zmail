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

  status('Consultando URL', 'info');

  $.ajax({
    method: "POST",
    url: "ajax.urls.php",
    datatype: 'JSON',
    data: { url: url }
  })
    .done(function(urls) {

      $.each(urls,function(i, url) {
        adicionaURL(url);
      });

      status('Pronto', 'success');

    });



}


function adicionaURL(url){

  //retira ânroas
  if(url.substr(0,1) == '#')
    return;

  //retira telefones
  if(url.substr(0,4) == 'tel:')
    return;

  //retira contatos de skype
  if(url.substr(0,4) == 'skype:')
    return;

  //retira social
  if(
    (url.indexOf('instagram.com') >= 0) ||
    (url.indexOf('twitter.com') >= 0)   ||
    (url.indexOf('youtube.com') >= 0)   ||
    (url.indexOf('google.com') >= 0)   ||
    (url.indexOf('facebook.com') >= 0)
  ) {
    return;
  }


  //separa e-mails
  if(url.substr(0,6) == 'mailto') {
    adicionaMail(url.substr(7));
    return;
  }

  var val = $('#urls').val();

  if(val.length > 0)
    val += "\r\n";

  $('#urls').val(val + url);

}

function adicionaMail($email){

  var val = $('#emails').val();

  if(val.length > 0)
    val += "\r\n";

  $('#emails').val(val + $email);

}

function status(txt, type){

  $('.status').removeClass('label-default');
  $('.status').removeClass('label-primary');
  $('.status').removeClass('label-success');
  $('.status').removeClass('label-info');
  $('.status').removeClass('label-warning');
  $('.status').removeClass('label-danger');

  $('.status').addClass('label-' + type);

  $('.status').text(txt);

}