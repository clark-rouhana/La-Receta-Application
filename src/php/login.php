<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

require_once "connection.php";


$_SESSION['test'] = "test";



$json = json_decode(file_get_contents('php://input'));
$email = $json->email;
$password = $json->password;
$success = false;

$errors = ["wrong" => "", "name" => "", "email" => "", "password" => "", "success" => $success];


if (empty($email)) {
    $errors["email"] = "Email is required";
}
if (empty($password)) {
    $errors["password"] = "Password is required";
}

$emailVal = filter_var($email, FILTER_VALIDATE_EMAIL);

if (!$emailVal) {
    $errors["email"] = "Invalid email format";
}

if ($errors["email"] == "" && $errors["password"] == "") {
    $password = hash("sha256", $password);
    $query = "SELECT * FROM users WHERE email=:email AND password=:password";
    $stmt = $connection->prepare($query);
    $stmt->execute(array(
        ':email' => $email,
        ':password' => $password
    ));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $bio = "";

    if ($row['bio'] !== null) {
        $bio = $row['bio'];
    }

    if ($row) {
        $success = true;
        $response = [
            'username' => $row['name'],
            'bio' => $bio,
            'success' => $success
        ];
        $res = json_encode($response);

        echo $res;
    } else {
        $errors["wrong"] = "Wrong username/password combination";
        $res = json_encode($errors);
        echo $res;
    }
} else {
    $res = json_encode($errors);
    echo $res;
}
