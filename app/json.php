<?php
    include_once "database.php";
    $filepath = "../json/users.json";
    $nickname = $_SESSION['pseudo'];

    if (file_exists($filepath) && isset($nickname)) {
        $json = file_get_contents($filepath);
        $jsonArray = json_decode($json, true);
    } else {
        header("Location: ../login");
        exit;
    }
    if (!(array_key_exists(getUuid($nickname), $jsonArray))) {
        header("Location: ../login");
        exit;
    }
?>