<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


require_once "connection.php";

$json = json_decode(file_get_contents('php://input'));

$username = $json->username;
$image = $json->image;
$path = $json->path;
$title = $json->title;
$caption = $json->caption;
$ingredients = $json->ingredients;
$instructions = $json->instructions;
$category = $json->category;
$success = false;
$errors = ["upload" => "", "title" => "", "caption" => "", "ingredients" => "", "instructions" => "", "category" => "", "success" => $success];

// File upload path
// $targetDir = '../src/assets/uploads/';
$filename = basename($image);
$fileType = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
// $image  = '';

// $actualname = $upload;
$actualname = preg_replace('/[^A-Za-z0-9\-]/', '', $filename);

$modifiedname = uniqid(rand(10, 200)) . '-' . rand(1000, 1000000) . '-' . $actualname . "." . $fileType;

// $targetDir = $targetDir . basename($modifiedname) . "." . $fileType;

if (empty($filename)) {
    $errors['upload'] = 'Please select an image to upload';
} else {
    // Allow certain image formats
    $allowTypes = array('jpg', 'png', 'jpeg');
    if (!in_array($fileType, $allowTypes)) {
        $errors['upload'] = 'Sorry, only JPG, JPEG & PNG files are allowed to upload';
    }
    // else {

    //     $image_base64 = base64_encode(file_get_contents($path));
    //     $image = "data::image/" . $fileType . ";base64," . $image_base64;

    // Upload image to server
    // if (!copy($path, $targetDir)) {
    //     $errors['upload'] = "Sorry, there was an error uploading your image";
    // }
    // }
}

// if (empty($upload)) {
//     $errors['upload'] = 'Please select an image to upload';
// }

if (empty($title)) {
    $errors["title"] = "Recipe name is required";
}
if (empty($caption)) {
    $errors["caption"] = "Caption is required";
}
if (empty($ingredients)) {
    $errors["ingredients"] = "Ingredients is required";
}
if (empty($instructions)) {
    $errors["instructions"] = "Instructions is required";
}
if (empty($category)) {
    $errors["category"] = "Category is required";
}

if ($errors["upload"] == "" && $errors["title"] == "" && $errors["caption"] == "" && $errors["ingredients"] == "" && $errors["instructions"] == "" && $errors["category"] == "") {


    $sql = "INSERT INTO recipes (username, title, caption, ingredients, instructions, category, image, path)
VALUES (:username, :title, :caption, :ingredients, :instructions, :category, :image, :path)";
    $stmt = $connection->prepare($sql);
    $stmt->execute(array(
        ':username' => $username,
        ':title' => $title,
        ':caption' => $caption,
        ':ingredients' => $ingredients,
        ':instructions' => $instructions,
        ':category' => $category,
        ':image' => $modifiedname,
        ':path' => $path
    ));



    $sql2 = "UPDATE users SET recipes = (SELECT COUNT(*) FROM recipes WHERE username = :username)";
    $stmt2 = $connection->prepare($sql2);
    $stmt2->execute(array(
        ':username' => $username
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
