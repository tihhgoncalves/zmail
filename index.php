<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>Documento sem título</title>
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
        <p>URl de partida</p>
        <input class="form-control" type="text" required="" id="url" placeholder="">
      </div>

      <div class="col-md-6">
        <p>Status:</p>
        <span class="status label label-success">Pronto</span>

      </div>

    </div>


    <hr>

    <div class="row">
      <div class="col-md-6">
        <button id="consultar" class="btn btn-primary">Consultar</button>
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
        <p>Urls:</p>
        <textarea class="form-control" id="urls" style="height: 300px;white-space:pre;" wrap="soft" id="urls"></textarea>
      </div>

      <div class="col-md-6">
        <p>E-mails:</p>
        <textarea class="form-control" id="emails" style="height: 300px;;white-space:pre;"></textarea>
      </div>
    </div>


  </div>

</header>
</body>
</html>
