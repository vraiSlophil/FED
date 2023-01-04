<?php
session_start();

if  (!isset($_SESSION["login"])) {
    $response = array(
        "error" => "You're not logged in. Please log in"
    );
}

require_once "../app/database.php";
$database = new Database();

$id = $database->getThemes($_SESSION["login"]);

if (count($id) > 0) {
    $response = [];
    foreach ($id as $value) {
        $response[] = array(
            "id" => $value,
            "title" => $database->getThemeTitle($value)
        );
    }
} else {
    $response = array(
        "error" => $id
    );
}

header('Content-Type: application/json');

echo json_encode(array("themes" => $response));
