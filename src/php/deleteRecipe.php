<?php
require_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

$id = $_GET["id"];
$username = $_GET["username"];


$sql = "DELETE FROM recipes WHERE id='" . $id . "'";
$stmt = $connection->query($sql);

$sql1 = "UPDATE users SET recipes = (SELECT COUNT(*) FROM recipes WHERE username = :username)";
$stmt1 = $connection->prepare($sql1);
$stmt1->execute(array(
    ':username' => $username
));
