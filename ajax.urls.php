<?
$url = $_POST['url'];

$code = file_get_contents($url);
//die($code);
$re = '/<a.+href="([^"]+)/mi';
preg_match_all($re, $code, $matches, PREG_SET_ORDER, 0);

//print_r($matches[0]);exit;

// Print the entire match result
foreach($matches as $match){
  echo($match[1] . "\r\n");
}

?>