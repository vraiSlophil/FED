<?php
session_start();

if (!isset($_SESSION["login"])) {
    $response = ["error" => "You're not logged in. Please log in"];
} else {
    require_once "../app/database.php";
    $database = new Database();

    $response = $database->createTheme($_SESSION["login"], "Nouveau thème");
}

header('Content-Type: application/json');
echo json_encode($response);
