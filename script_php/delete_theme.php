<?php
session_start();
require_once "../app/database.php";
$database = new Database();

$data = json_decode(file_get_contents('php://input'), true);
$theme_id = intval($data['theme_id']);

$theme_author = $database->getThemeAuthor($theme_id);

if (!$theme_author || $_SESSION["login"] != $theme_author) {
    $response = array(
        "error" => "The specified ID does not match the ID in the database.",
        "done" => false
    );
} else {
    $action = $database->deleteTheme($theme_id);
    if (!$action) {
        $response = array(
            "error" => "An unexpected and unknown error has occurred. Please contact an administrator for assistance.",
            "done" => false
        );
    } else {
        $response = array(
            "done" => true
        );
    }
}

header('Content-Type: application/json');

echo json_encode($response);