<?php
session_start();

if  (!isset($_SESSION["login"])) {
    $response = ["error" => "You're not logged in. Please log in", "done" => false];
    goto end;
}

require_once "../app/database.php";
$database = new Database();

$data = json_decode(file_get_contents('php://input'), true);
$theme_id = intval($data['theme_id']);
$task_name = strval($data['task_name']);
$task_author_id = intval($_SESSION["login"]);

$query = $database->createTask($theme_id, $task_name, $task_author_id);
$response = ((int) $query > 0) ? ["id" => (int) $query, "done" => true] : ["error" => $query, "done" => false];

end:

header('Content-Type: application/json');
echo json_encode($response);
