<?php
session_start();

if  (!isset($_SESSION["login"])) {
    $response = array(
        "error" => "You're not logged in. Please log in"
    );
}

require_once "../app/database.php";
$database = new Database();

$id = $database->createTheme($_SESSION["login"], "Nouveau thème");

if ((int) $id > 0) {
    $id = (int) $id;
    $response = array(
        "id" => $id,
        "title" => $database->getThemeTitle($id)
    );
} else {
    $response = array(
        "error" => $id
    );
}

header('Content-Type: application/json');

echo json_encode($response);
