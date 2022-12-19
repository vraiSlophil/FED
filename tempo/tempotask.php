<?php
    session_start();
    include_once "../app/database.php";

    $newTask = trim($_POST["newtask"]);
    $filePath = "../json/users.json";
    $nickname = $_SESSION['pseudo'];

    if (file_exists($filePath) && isset($nickname)) {
        $json = file_get_contents($filePath);
        $jsonArray = json_decode($json, true);
    } else {
        header("Location: ../login.php");
        exit;
    }
    if (!(array_key_exists(getUuid($nickname), $jsonArray))) {
        header("Location: ../login.php");
        exit;
    }

    if($newTask == "") {
        $_SESSION["errorMessage"] = "La tâche ne peut pas être ajoutée.";
        header("Location: ../home.php");
        exit;
    }

     $jsonArray[getUuid($nickname)][] = $newTask;

    file_put_contents($filePath, json_encode($jsonArray, JSON_PRETTY_PRINT));

    header("Location: ../home.php");
    exit;
?>