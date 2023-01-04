<?php
session_start();

if  (!isset($_SESSION["login"])) {
    $response = array(
        "error" => "You're not logged in. Please log in."
    );
}

require_once "../app/database.php";
$database = new Database();

$data = json_decode(file_get_contents('php://input'), true);
$theme_id = intval($data['theme_id']);

$theme_author = $database->getThemeAuthor($theme_id);

if (!$theme_author || $_SESSION["login"] != $theme_author) {
    $response = array(
        "error" => "The specified ID does not match the ID in the database."
    );
} else {
    $tasks = $database->getTasks($theme_id);

    $response = (gettype($tasks) == "array") ? $tasks : ["error" => "An unexpected and unknown error has occurred. Please contact an administrator for assistance."];

}

header('Content-Type: application/json');

echo json_encode($response);