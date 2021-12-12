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
$title = $json->title;
$caption = $json->caption;
$ingredients = $json->ingredients;
$instructions = $json->instructions;
$category = $json->category;
$success = false;
$errors = ["upload" => "", "title" => "", "caption" => "", "ingredients" => "", "instructions" => "", "category" => "", "success" => $success];

$filename = basename($image);
$fileType = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
$actualname = preg_replace('/[^A-Za-z0-9\-]/', '', $filename);
$modifiedname = uniqid(rand(10, 200)) . '-' . rand(1000, 1000000) . '-' . $actualname . "." . $fileType;

if (empty($filename)) {
    $errors['upload'] = 'Please select an image to upload';
} else {
    $allowTypes = array('jpg', 'png', 'jpeg');
    if (!in_array($fileType, $allowTypes)) {
        $errors['upload'] = 'Sorry, only JPG, JPEG & PNG files are allowed to upload';
    }
}

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

    $sql = "UPDATE recipes SET title = :title, caption = :caption, ingredients = :ingredients, instructions = :instructions, category = :category, image = :image,  path = :path WHERE id = :id";
    $stmt = $connection->prepare($sql);
    $stmt->execute(array(
        ':title' => $title,
        ':caption' => $caption,
        ':ingredients' => $ingredients,
        ':instructions' => $instructions,
        ':category' => $category,
        ':image' => $modifiedname,
        ':path' => $path,
        ':id' => $id
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
