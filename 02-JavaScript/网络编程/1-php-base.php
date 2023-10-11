<?php
header("content-type:text/html;charset=utf-8");
//$num = 10;
//echo $num;

/*$arr = array(1, 3, 5);
print_r($arr);
echo "<br>";
echo $arr[0];*/

/*$dict = array("name" => "wyh", "age" => 22, "work" => "student");
print_r($dict);
echo "<br>";
echo $dict["name"];*/

/*$num = 19;
if ($num < 18){
    echo "未成年人";
}else{
    echo "成年人";
}*/

/*$num = 17;
$res = $num > 18 ? "成年人" : "未成年人";
echo $res;*/

/*$age = 0;
switch ($age){
    case 0:
        echo 0;
        break;
    case 2:
        echo 2;
        break;
    default:
        echo "other";
        break;
}*/

$arr = array(1, 3, 5);
/*for ($i = 0; $i < count($arr); $i++){
    echo $arr[$i];
    echo "<br>";
}*/
$index = 0;
while ($index < count($arr)){
    echo $arr[$index];
    echo "<br>";
    $index++;
}
