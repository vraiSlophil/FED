<?php
session_start();

if (!isset($_SESSION["login"])) {
    $response = array(
        "error" => "You're not logged in. Please log in"
    );
    goto end;
}

require_once "../app/database.php";
$database = new Database();

$data = json_decode(file_get_contents('php://input'), true);
$theme_id = intval($data['theme_id']);

$query = $database->getTasks($theme_id);

if (count($query) > 0) {
    $response = [];
    foreach ($query as $value) {
        $response[] = array(
            "id" => $value["task_id"],
            "title" => $value["title"],
            "status" => $value["task_status"]
        );
    }
} else {
    $response = array(
        "error" => $query
    );
}

end:

header('Content-Type: application/json');

echo json_encode(array("tasks" => $response));
