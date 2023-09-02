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
$new_username = isset($data["newUsername"]) ? $data["newUsername"] : null;
$password = isset($data["password"]) ? $data["password"] : null;
$new_password = isset($data["newPassword"]) ? $data["newPassword"] : null;
$new_mail = isset($data["newMail"]) ? $data["newMail"] : null;
$new_first_name = isset($data["password"]) ? $data["password"] : null;
$new_last_name = isset($data["password"]) ? $data["password"] : null;


header('Content-Type: application/json');

echo json_encode($response);