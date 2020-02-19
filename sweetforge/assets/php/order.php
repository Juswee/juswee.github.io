<?php

mkdir("txt", "0755");
$fp = fopen("text.txt", "w");
fwrite($fp, "str");
fclose($fp);


//$fp = fopen("file.txt", "w");
//fwrite($fp, $_GET['value']."\n");
//fclose($fp);

?>