<?php 
    session_start();

    include_once "../app/database.php";

    $nickname = trim($_POST["pseudo"]);
    $password = md5(trim($_POST["mdp"]));
    $email = trim($_POST["email"]);
    $uuid = uniqid();

    if ($email == "" || !(filter_var($email, FILTER_VALIDATE_EMAIL)) || $nickname == "" || $password == "") {
        $_SESSION["errorMessage"] = "Les identifiants ne sont pas valides.";
        header("Location: ../login.php");
        exit;
    }

    $filePath = "../json/users.json";

    if (file_exists($filePath)) {
        $json = file_get_contents($filePath);
        $jsonArray = json_decode($json, true);      
        
    } else {
        $jsonArray = [];
    }

    if (verifyEmail($email)) {
        $_SESSION["errorMessage"] = "Cette adresse email est déjà utilisée.";
        header("Location: ../register.php");
        exit;
    } elseif (verifyNickname($nickname)) {
        $_SESSION["errorMessage"] = "Ce pseudo est déjà utilisé.";
        header("Location: ../register.php");
        exit;
    } else {
        createUser($email, $password, $nickname, $uuid);
        $jsonArray[$uuid] = [];
    }

    file_put_contents($filePath, json_encode($jsonArray, JSON_PRETTY_PRINT));
    
    $_SESSION["pseudo"] = $nickname;

    header("Location: ../home.php");
    exit;
?>