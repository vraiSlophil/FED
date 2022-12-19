<?php
    session_start();
    include_once "../app/database.php";
    
    $task = $_POST["task"];
    
    if($task == "") {
        header("Location: ../home.php");
        exit;
    }
    
    $nickname = $_SESSION["pseudo"];
    
    $filePath = "../json/users.json";
    
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
    
    unset($jsonArray[getUuid($nickname)][array_search($task, $jsonArray[getUuid($nickname)])]);
    
    file_put_contents($filePath, json_encode($jsonArray, JSON_PRETTY_PRINT));
    
    header("Location: ../home.php");
    exit;
?>