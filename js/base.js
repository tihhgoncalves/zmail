$(document).ready(function(){


  $('#consultar').click(function(){


    if (VerifyCheck('check_todasUrl')) {
      var msg;
      msg = 'Vi que você marcou pra analisar as urls automaticamente.';
      msg += "\r\n";
      msg += "\r\n";
      msg += 'Perfeito! =)';
      msg += "\r\n";
      msg += "\r\n";
      msg += 'Mas quando quiser parar, simplesmente desmarque essa opção que o sistema irá parar após de verificar a URL vigente.';
      alert(msg);
    }

    var url = $('#url').val();
    consultaURL(url);

  });

});


function consultaURL(urlPesquisada){

  if(urlPesquisada.length > 0) {

    if (urlPesquisada.substr(0, 4) != 'http') {
      urlPesquisada = 'http://' + urlPesquisada;
      $('#url').val(urlPesquisada);
    }


    status('Consultando URL', 'info');

    $.ajax({
      method: "POST",
      url: "ajax.urls.php",
      datatype: 'JSON',
      data: {url: urlPesquisada}
    })
      .done(function (urls) {

        $.each(urls, function (i, url) {
          adicionaURL(url, urlPesquisada);
        });

        status('Pronto', 'success');
        var val = $('#url').val();
        $('#url').val('');

        adicionaUrlHistorico(val);

        if (VerifyCheck('check_todasUrl'))
          ProximaUrl(true);
        else
          ProximaUrl(false);
      })
      .fail(function () {
        status('Ocorreu um erro', 'danger');

        var val = $('#url').val();

        adicionaUrlErro(val);

        if (VerifyCheck('check_ignorarErros')) {

          if (VerifyCheck('check_todasUrl'))
            ProximaUrl(true);
          else
            ProximaUrl(false);

        }


      })

  } else {
    alert('digite uma URL');
  }
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
    (url.indexOf('plus.google.com') >= 0)   ||
    (url.indexOf('zendesk.com') >= 0)   ||
    (url.indexOf('pinterest.com') >= 0)   ||
    (url.indexOf('m.me') >= 0)   ||
    (url.indexOf('foursquare.com') >= 0)   ||
    (url.indexOf('microsoft.com') >= 0)   ||
    (url.indexOf('linkedin.com') >= 0)   ||
    (url.indexOf('behance.net') >= 0)   ||
    (url.indexOf('github.com') >= 0)   ||
    (url.indexOf('medifire.com') >= 0)   ||
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

  //se for //
  if(url.substr(0,2) == '//') {

    if(urlPesquisada.substr(0,5) == 'https')
      url = 'https:'. url;
    else
      url = 'http:'. url;

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
  var temp = '||' + val.replaceAll("\n", '||') + '||'
    + $('#urlsHistorico').val().replaceAll("\n", '||')
    + $('#urlsErro').val().replaceAll("\n", '||')
    + '||' + $('#url').val() + '||';

  if(temp.indexOf('||'+url+'||') >= 0)
    return;


  if(val.length > 0)
    val += "\r\n";

  $('#urls').val(val + url);

  contadorUrlsPedentes();

}

function adicionaMail(email){

  email = email.trim();

  //tira parametros..
  if(email.indexOf('?') > 0){
    email = email.substr(0, email.indexOf('?'));
  }

  var val = $('#emails').val();

  //verifica se já está na lista
  var temp = '||' + val.replaceAll("\n", '||') + '||';
  if(temp.indexOf('||'+email+'||') >= 0)
    return;

  if(val.length > 0)
    val += "\r\n";

  $('#emails').val(val + email);

  contadorUrlsEmails();

}

function adicionaUrlHistorico(url){

  var urlsHistorico = $('#urlsHistorico').val();

  if (urlsHistorico.length > 0)
    urlsHistorico += "\r\n";

  urlsHistorico += url;
  $('#urlsHistorico').val(urlsHistorico);

  contadorUrlsHistorico();

}

function adicionaUrlErro(url){

  var urlsErro = $('#urlsErro').val();

  if (urlsErro.length > 0)
    urlsErro += "\r\n";

  urlsErro += url;
  $('#urlsErro').val(urlsErro);

  contadorUrlsErro();

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

function ProximaUrl(click){

  var br = $('#urls').val().indexOf("\n");

  if(br == -1)
    br = $('#urls').val().length;

  var newUrl = $('#urls').val().substr(0, br);
  var newUrls = $('#urls').val().substr(br+1);
  $('#url').val(newUrl);
  $('#urls').val(newUrls);

  console.log('URL:' + newUrl + ' // ' + br);

  if(typeof click == 'undefined')
    click = true;

  if(click) {

    if($('#urls').val().length > 0) {

      var url = $('#url').val();
      consultaURL(url);

    } else {

      setTimeout(function () {
        status('Terminou lista', 'success');
      }, 5000);

    }

  }

  contadorUrlsPedentes();

}

function VerifyCheck(selectorID){
    return ($('input#' + selectorID + ':checked').length > 0)
}


String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
  return this.split(needle).join(replacement);
};


function contadorUrlsPedentes(){
  $('#urls_total').text(' (' + $('#urls').val().split('\n').length + ')');
}


function contadorUrlsHistorico(){
  $('#urlsHistorico_total').text(' (' + $('#urlsHistorico').val().split('\n').length + ')');
}

function contadorUrlsEmails(){
  $('#emails_total').text(' (' + $('#emails').val().split('\n').length + ')');
}

function contadorUrlsErro(){
  $('#urlsErro_total').text(' (' + $('#urlsErro').val().split('\n').length + ')');
}

