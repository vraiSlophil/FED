<?php
session_start();

if  (!isset($_SESSION["login"])) {
    $response = array(
        "error" => "You're not logged in. Please log in"
    );
}

require_once "../app/database.php";
$database = new Database();

$data = json_decode(file_get_contents('php://input'), true);
$theme_id = intval($data['theme_id']);

$theme_author = $database->getThemeAuthor($theme_id);

if (!$theme_author || $_SESSION["login"] != $theme_author) {

    $query = $database->deleteAuthorizedUser($_SESSION["login"], $theme_id);

    $response = ($query) ? ["done" => true] : ["error" => "The specified ID does not match the ID in the database.", "done" => false];

} else {
    $action = $database->deleteTheme($theme_id);
    $response = (is_bool($action)) ? ["done" => $action] : ["error" => $action[1], "done" => $action[0]];
}

header('Content-Type: application/json');

echo json_encode($response);