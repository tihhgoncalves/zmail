$(document).ready(function(){


  $('#consultar').click(function(){

    var url = $('#url').val();

    if(url.substr(0,4) != 'http') {
      url = 'http://' + url;
      $('#url').val(url);
    }

    if(url.length > 0) {
      consultaURL(url);
    } else {
      alert('digite uma URL');
    }

  });

});


function consultaURL(urlPesquisada){

  console.log('Consultando URL: '. url)

  status('Consultando URL', 'info');

  $.ajax({
    method: "POST",
    url: "ajax.urls.php",
    datatype: 'JSON',
    data: { url: urlPesquisada }
  })
    .done(function(urls) {

      $.each(urls,function(i, url) {
        adicionaURL(url, urlPesquisada);
      });

      status('Pronto', 'success');

    })
    .fail(function(){
      status('Ocorreu um erro', 'danger');
    })



}


function adicionaURL(url, urlPesquisada){

  //retira ânroas
  if(url.substr(0,1) == '#')
    return;

  //retira telefones
  if(url.substr(0,4) == 'tel:')
    return;

  //retira ftp
  if(url.substr(0,4) == 'ftp:')
    return;

  //retira javascript
  if(url.substr(0,10) == 'javascript')
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
    (url.indexOf('zendesk.com') >= 0)   ||
    (url.indexOf('pinterest.com') >= 0)   ||
    (url.indexOf('m.me') >= 0)   ||
    (url.indexOf('foursquare.com') >= 0)   ||
    (url.indexOf('facebook.com') >= 0)
  ) {
    return;
  }


  //separa e-mails
  if(url.substr(0,6) == 'mailto') {
    adicionaMail(url.substr(7));
    return;
  }

  //monta URL composta

  if(urlPesquisada.length > 0){

    if(url.substr(0, 4) !== 'http') {

      var new_url;

      new_url = urlPesquisada;

      //retira barra do final da URL Pesquisada
      if(new_url.substr(-1) == '/')
        new_url  = new_url.substr(0, new_url.length-1);

      //retira barra do começo da URL
      if(url.substr(0, 1) == '/')
        url  = url.substr(1);

      new_url += '/' +  url;

      url = new_url;
    }

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