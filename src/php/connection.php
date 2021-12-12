<?php

$username = "root";
$password = "";

try {
    $connection = new PDO('mysql:host=localhost;dbname=larecetamobile', $username, $password);
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
