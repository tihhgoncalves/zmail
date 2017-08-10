<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>zMail</title>
<link rel="stylesheet" href="css/reset.css">


<!-- BOWER - jQuery -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>

<!-- BOWER - Bootstrap -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<!-- BOWER - rhinoJS -->
<script src="bower_components/rhinoJS/dist/rhinoJS.js"></script>

<!-- BOWER - Font Awesome -->
<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">

<!-- BOWER - animate.css -->
<link rel="stylesheet" href="bower_components/animate.css/animate.min.css">

<!--BOWER - Bootstrap Device Debug -->
<!-- Quando terminar o site comentar as chamas abaixo -->
<script src="bower_components/bootstrap-device-debug/bootstrap-device-debug.js"></script>
<link rel="stylesheet" href="bower_components/bootstrap-device-debug/bootstrap-device-debug.css">

<!-- Controle de acesso pelo Mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>

<!-- Carrega CSS -->
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/checkbox.css">

<!-- Carrega JS -->
<script src="js/base.js"></script>
</head>

<body>
<header>
  <div class="container">

    <div class="row">
      <div class="col-md-12">
        <h1>zMail</h1>
      </div>
    </div>

    <div class="row">

      <div class="col-md-6">
        <p>Consulta uma URL</p>
        <input class="form-control" type="text" required="" id="url" placeholder="Digite uma URL e clique em Começar">


      </div>

      <div class="col-md-6">
        <div class="checkbox">
          <label>
            <input type="checkbox" value="" id="check_todasUrl" checked>
            <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
            Todas as urls da lista automaticamente.
          </label>
        </div>

        <div class="checkbox">
          <label>
            <input type="checkbox" value="" id="check_ignorarErros">
            <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
            Ignorar erros
          </label>
        </div>



      </div>

    </div>


    <hr>

    <div class="row">
      <div class="col-md-6">
        <button id="consultar" class="btn btn-primary">Começar</button>

        <span style="margin-left: 25px;" class="status label label-success">Pronto</span>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-md-12">
        <h2>Resultados</h2>
      </div>
    </div>

    <div class="row">

      <div class="col-md-6">
        <p>Urls Pendentes <span id="urls_total">(0)</span></p>
        <textarea class="form-control" id="urls" style="height: 100px;white-space:pre;" wrap="soft" ></textarea>

        <p>Histórico já consultadas <span id="urlsHistorico_total">(0)</span></p>
        <textarea class="form-control" id="urlsHistorico" style="height: 100px;white-space:pre;" wrap="soft"></textarea>

        <p>Urls que retornaram erro <span id="urlsErro_total">(0)</span></p>
        <textarea class="form-control" id="urlsErro" style="height: 100px;white-space:pre;" wrap="soft"></textarea>
      </div>

      <div class="col-md-6">
        <p>E-mails coletados  <span id="emails_total">(0)</span></p>
        <textarea class="form-control" id="emails" style="height: 420px;;white-space:pre;"></textarea>
      </div>
    </div>


  </div>

</header>
</body>
</html>
