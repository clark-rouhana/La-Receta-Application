<?php
require_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$id = $_GET['id'];

$sql = "SELECT * FROM recipes WHERE id = :id limit 1";

$stmt = $connection->prepare($sql);
$stmt->execute(array(
    ":id" => $id,
));

$row = $stmt->fetch(PDO::FETCH_ASSOC);

$res = json_encode($row);

echo $res;
