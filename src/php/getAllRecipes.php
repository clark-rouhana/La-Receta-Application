<?php
require_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$username = $_GET['username'];
$sql = '';
if($username == 'allRec')
{
    $sql = "SELECT * FROM recipes";
} else{
    $sql = "SELECT * FROM recipes WHERE username = " . $username ;   
}

$stmt = $connection->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$res = [];

foreach ($rows as $row) {
    $res[] = $row;
}

// $res[] = $username;

$json = json_encode($res);
echo $json;

