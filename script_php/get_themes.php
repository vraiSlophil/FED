<?php
session_start();

if  (!isset($_SESSION["login"])) {
    $response = array(
        "error" => "You're not logged in. Please log in"
    );
}

require_once "../app/database.php";
$database = new Database();

$query = $database->getThemes($_SESSION["login"]);

if (count($query) > 0) {
    $response = [];
    foreach ($query as $value) {
        $response[] = array(
            "id" => $value,
            "title" => $database->getThemeTitle($value),
            "color" => $database->getThemeColor($value)
        );
    }
} else {
    $response = array(
        "error" => $query
    );
}

header('Content-Type: application/json');

echo json_encode(array("themes" => $response));
