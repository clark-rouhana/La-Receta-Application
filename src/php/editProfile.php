<?php

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

require_once "connection.php";

$json = json_decode(file_get_contents('php://input'));

$id = $_GET['id'];
$image = $json->image;
$path = $json->path;
$name = $json->name;
$bio = $json->bio;
$localname = $json->localname;
$localbio = $json->localbio;

$success = false;
$errors = ["upload" => "", "name" => "", "success" => $success];

$filename = basename($image);
$fileType = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
$actualname = preg_replace('/[^A-Za-z0-9\-]/', '', $filename);
$modifiedname = uniqid(rand(10, 200)) . '-' . rand(1000, 1000000) . '-' . $actualname . "." . $fileType;

if (!empty($filename)) {
    $allowTypes = array('jpg', 'png', 'jpeg');
    if (!in_array($fileType, $allowTypes)) {
        $errors['upload'] = "Sorry, only JPG, JPEG & PNG files\nare allowed to upload";
    }
}

if (empty($name)) {
    $errors["name"] = "Name cannot be empty";
}

$nameVal = preg_match("/^[a-z0-9]+([_ -]?[a-z0-9])*$/", $name);

if (!$nameVal) {
    $errors["name"] = "Only lowercase are allowed (example: clark_rouhana)";
}


if ($name != $localname) {
    $user_check_query = "SELECT * FROM users WHERE name=:name LIMIT 1";
    $stmt1 = $connection->prepare($user_check_query);
    $stmt1->execute(array(
        ':name' => $name
    ));
    $row = $stmt1->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        if ($row['name'] === $name) {
            $errors["name"] = "Username already exists";
        }
    }
}

if ($errors["upload"] == "" && $errors["name"] == "") {

    $sql = "UPDATE users SET name = :name, bio = :bio, image = :image, path = :path WHERE id = :id";
    $stmt2 = $connection->prepare($sql);
    $stmt2->execute(array(
        ':name' => $name,
        ':bio' => $bio,
        ':image' => $image,
        ':path' => $path,
        ':id' => $id
    ));

    $username = $localname;
    $biog = $localbio;


    if ($name != $localname) {
        $sql1 = "UPDATE recipes SET username = :username WHERE username = :localname";
        $stmt3 = $connection->prepare($sql1);
        $stmt3->execute(array(
            ':username' => $name,
            ':localname' => $localname
        ));

        $sql2 = "UPDATE contactus SET username = :username WHERE username = :localname";
        $stmt4 = $connection->prepare($sql2);
        $stmt4->execute(array(
            ':username' => $name,
            ':localname' => $localname
        ));

        $username = $name;
    }

    if ($bio != $localbio) {
        $biog = $bio;
    }

    $success = true;
    $response = [
        'username' => $username,
        'bio' => $biog,
        'success' => $success
    ];
    $res = json_encode($response);
    echo $res;
} else {
    $res = json_encode($errors);
    echo $res;
}
