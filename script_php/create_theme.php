<?php
session_start();

if (!isset($_SESSION["login"])) {
    $response = ["error" => "You're not logged in. Please log in"];
} else {
    require_once "../app/database.php";
    $database = new Database();

    $id = (int) $database->createTheme($_SESSION["login"], "Nouveau thème");
    $response = ($id > 0) ? ["id" => $id, "title" => $database->getThemeTitle($id)] : ["error" => $id];
}

header('Content-Type: application/json');
echo json_encode($response);
