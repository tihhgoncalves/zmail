<?
$url = $_POST['url'];

$code = file_get_contents($url);

//urls
$re = '/<a.+href="([^"]+)/mi';
preg_match_all($re, $code, $matches, PREG_SET_ORDER, 0);

//print_r($matches[0]);exit;

$json_a = array();

foreach($matches as $match){
  $url = $match[1];
  $json_a[] = $url;
}

//e-mails
$re = '/[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/mi';
preg_match_all($re, $code, $matches, PREG_SET_ORDER, 0);

foreach($matches as $match){
  $mails = $match[0];
  $json_a[] = 'mailto:' . $mails;
}

header('Content-Type: application/json');
echo json_encode($json_a);
?>