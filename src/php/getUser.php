<?php
require_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$username = $_GET['username'];

$sql = "SELECT * FROM users WHERE name = :username limit 1";

$stmt = $connection->prepare($sql);
$stmt->execute(array(
    ":username" => $username,
));

$row = $stmt->fetch(PDO::FETCH_ASSOC);

$res = json_encode($row);

echo $res;
