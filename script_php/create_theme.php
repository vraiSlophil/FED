<?php
require_once "app/database.php";
$database = new Database();

$response = array(
    "id" => $database->createTheme("Nouveau thème")
);

header('Content-Type: application/json');

echo json_encode($response);
