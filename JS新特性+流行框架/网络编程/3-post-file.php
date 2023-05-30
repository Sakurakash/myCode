<?php
header("content-type:text/html;charset=utf-8");//包含中文时需添加;
echo "upload ok!";
echo "<br>";
print_r($_FILES);
echo "<br>";
$fileInfo = $_FILES["upfile"];
$fileName= iconv("UTF-8", "gb2312", $fileInfo["name"]);
$fileUrl = $fileInfo["tmp_name"];
print_r($fileInfo);
echo "<br>";
print_r($fileName);
move_uploaded_file($fileUrl, "./source/".$fileName);
