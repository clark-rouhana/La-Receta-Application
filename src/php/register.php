<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

require_once "connection.php";

$json = json_decode(file_get_contents('php://input'));

$name = $json->name;
$email = $json->email;
$password = $json->password;
$confirmPass = $json->confirmPass;
$success = false;
$errors = ["name" => "", "email" => "", "password" => "", "success" => $success];

$nameVal = preg_match("/^[a-z0-9]+([_ -]?[a-z0-9])*$/", $name);
$emailVal = filter_var($email, FILTER_VALIDATE_EMAIL);
$passVal = preg_match("/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/", $password);

if (!$nameVal) {
    $errors["name"] = "Only lowercase are allowed (example: clark_rouhana)";
}
if (!$emailVal) {
    $errors["email"] = "Invalid email format";
}
if ($password != $confirmPass) {
    $errors["password"] = "The two passwords do not match";
}
if (!$passVal) {
    $errors["password"] = "Your Password is Weak";
}

if (empty($name)) {
    $errors["name"] = "Username is required";
}
if (empty($email)) {
    $errors["email"] = "Email is required";
}
if (empty($password)) {
    $errors["password"] = "Password is required";
}


$user_check_query = "SELECT * FROM users WHERE name=:name OR email=:email LIMIT 1";
$stmt1 = $connection->prepare($user_check_query);
$stmt1->execute(array(
    ':name' => $name,
    ':email' => $email
));
$row = $stmt1->fetch(PDO::FETCH_ASSOC);


if ($row) {
    if ($row['name'] === $name) {
        $errors["name"] = "Username already exists";
    }

    if ($row['email'] === $email) {
        $errors["email"] = "Email already exists";
    }
}

if ($errors["name"] == "" && $errors["email"] == "" && $errors["password"] == "") {
    $password = hash("sha256", $password);

    $sql = "INSERT INTO users (name, email, password)
VALUES (:name, :email, :password)";
    $stmt2 = $connection->prepare($sql);
    $stmt2->execute(array(
        ':name' => $name,
        ':email' => $email,
        ':password' => $password
    ));

    $success = true;
    $response = [
        'username' => $name,
        'success' => $success
    ];
    $res = json_encode($response);
    echo $res;
} else {
    $res = json_encode($errors);
    echo $res;
}
