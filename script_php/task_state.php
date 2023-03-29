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
$task_status = boolval($data["task_status"]);

print_r($task_id);
print_r($task_status);

$action = $database->updateTaskStatus($task_id, $task_status);
$response = ($action) ? ["done" => true] : ["error" => "An unexpected and unknown error has occurred. Please contact an administrator for assistance.", "done" => false];

header('Content-Type: application/json');

echo json_encode($response);