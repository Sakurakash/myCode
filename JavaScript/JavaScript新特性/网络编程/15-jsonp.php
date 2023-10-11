<?php
$teacher = $_GET["teacher"];
$age = $_GET["age"];
$arr = array("teacher" => $teacher, "age" => $age);
$data = json_encode($arr);
$cb = $_GET["cb"];
echo $cb."(".$data.")";


