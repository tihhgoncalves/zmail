<?
$emails   = $_POST['emails'];
$url      = $_POST['url'];
$file     = $_POST['file'];

$file = fopen('logs/' . $file, 'w');

$code  = 'URL: ' . $url;
$code .= "\r\n";
$code .= '-------------------------------------';
$code .= "\r\n";
$code .= "\r\n";
$code .= str_replace("\n", "\r\n", $emails);
$code .= "\r\n";

fwrite($file, $code);
fclose($file);
?>