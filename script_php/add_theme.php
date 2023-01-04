<?php
session_start();

if (!isset($_SESSION["login"])) {
    $response = ["error" => "You're not logged in. Please log in."];
    goto end;
}

require_once "../app/database.php";
$database = new Database();

$data = json_decode(file_get_contents('php://input'), true);
$theme_id = intval($data['theme_id']);

$theme_author = $database->getThemeAuthor($theme_id);

if (!$theme_author || $_SESSION["login"] != $theme_author) {
    $response = ["error" => "The specified ID does not match the ID in the database."];
    goto end;
}

$tasks = $database->getTasks($theme_id);

$response = (gettype($tasks) == "array") ? $tasks : ["error" => "An unexpected and unknown error has occurred. Please contact an administrator for assistance." .gettype($tasks)];

end:
header('Content-Type: application/json');

echo json_encode($response);
