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

  console.log('Consultando URL: '. urlPesquisada)

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
      var val = $('#url').val();
      $('#url').val('');
      var urlsHistorico = $('#urlsHistorico').val();

      if(urlsHistorico.length > 0)
        urlsHistorico += "\r\n";

      urlsHistorico += val;
      $('#urlsHistorico').val(urlsHistorico);

      var br = $('#urls').val().indexOf("\n");
      var newUrl = $('#urls').val().substr(0, br);
      var newUrls = $('#urls').val().substr(br+1);
      $('#url').val(newUrl);
      $('#urls').val(newUrls);

      $('#consultar').click();

    })
    .fail(function(){
      status('Ocorreu um erro', 'danger');
    })

}


function adicionaURL(url, urlPesquisada){

  url = url.trim();

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

  //retira .jpg .png .gif .jpeg
  if( (url.substr(-4) == '.jpg') || (url.substr(-4) == '.png') || (url.substr(-4) == '.gif') || (url.substr(-5) == '.jpeg'))
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
    (url.indexOf('linkedin.com') >= 0)   ||
    (url.indexOf('behance.net') >= 0)   ||
    (url.indexOf('github.com') >= 0)   ||
    (url.indexOf('leiame.org') >= 0)   ||
    (url.indexOf('githubusercontent.com') >= 0)   ||
    (url.indexOf('be.net') >= 0)   ||
    (url.indexOf('adobe.com') >= 0)   ||
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

  //verifica se já está na lista
  var temp = '||' + val.replaceAll("\n", '||') + '||' + $('#urlsHistorico').val().replaceAll("\n", '||') + '||' + $('#url').val() + '||';

  if(temp.indexOf('||'+url+'||') >= 0)
    return;


  if(val.length > 0)
    val += "\r\n";

  $('#urls').val(val + url);

}

function adicionaMail(email){

  email = email.trim();

  var val = $('#emails').val();

  //verifica se já está na lista
  var temp = '||' + val.replaceAll("\n", '||') + '||';
  if(temp.indexOf('||'+email+'||') >= 0)
    return;

  if(val.length > 0)
    val += "\r\n";

  $('#emails').val(val + email);

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


String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
      return this.split(needle).join(replacement);
    };