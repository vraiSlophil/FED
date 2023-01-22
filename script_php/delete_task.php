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

$action = $database->deleteTask($task_id);
$response = ($action) ? ["done" => true] : ["error" => "An unexpected and unknown error has occurred. Please contact an administrator for assistance.", "done" => false];

header('Content-Type: application/json');

echo json_encode($response);