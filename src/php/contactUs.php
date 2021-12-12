<?php
session_start();
// error_reporting(0);
require_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

$json = json_decode(file_get_contents('php://input'));

$username = $json->username;
$name = $json->name;
$email = $json->email;
$subject = $json->subject;
$message = $json->message;
$success = false;

$errors = ["name" => "", "email" => "", "subject" => "", "message" => "", "success" => $success];

if (empty($name)) {
    $errors["name"] = "(Name is required)";
}
if (empty($email)) {
    $errors["email"] = "(Email is required)";
}
if (empty($subject)) {
    $errors["subject"] = "(Subject is required)";
}
if (empty($message)) {
    $errors["message"] = "(Message is required)";
}

$emailVal = filter_var($email, FILTER_VALIDATE_EMAIL);

if (!$emailVal) {
    $errors["email"] = "(Invalid email format)";
}

if ($errors["name"] == "" && $errors["email"] == "" && $errors["subject"] == "" && $errors["message"] == "") {
    $sql = "INSERT INTO contactus (username, name, email, subject, message)
            VALUES (:username, :name, :email, :subject, :message)";
    $stmt = $connection->prepare($sql);
    $stmt->execute(array(
        ':username' => $username,
        ':name' => $name,
        ':email' => $email,
        ':subject' => $subject,
        ':message'  => $message
    ));

    $success = true;
    $response = [
        'success' => $success
    ];
    $res = json_encode($response);
    echo $res;
} else {
    $res = json_encode($errors);
    echo $res;
}
