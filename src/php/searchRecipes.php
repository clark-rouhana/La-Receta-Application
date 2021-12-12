<?php

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

require_once "connection.php";


$term = $_GET['term'];


$sql = "SELECT * from recipes WHERE title LIKE '%$term%'";
$stmt = $connection->query($sql);

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$res = [];


foreach ($rows as $row) {
    $res[] = $row;
}

$json = json_encode($res);

echo $json;