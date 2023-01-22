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
$task_id = intval($data["task_id"]);
$new_title = strval($data["new_title"]);


$action = $database->editTask($task_id, $new_title);
$response = ($action) ? ["done" => true] : ["done" => false];

header('Content-Type: application/json');

echo json_encode($response);