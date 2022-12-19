<?php 
    session_start();
    include "../app/database.php";

    $nickname = mysqli_real_escape_string($conn, trim($_POST["pseudo"]));
    $password = mysqli_real_escape_string($conn, md5(trim($_POST["mdp"])));
    $filePath = "../json/users.json";

    if ($nickname == "" || $password == "") {
        $_SESSION["errorMessage"] = "Le nom d'utilisateur ou le mot de passe est inconnu.";
        header("Location: ../login.php");
        exit;
    }

    if (file_exists($filePath)) {
        $json = file_get_contents($filePath);
        $jsonArray = json_decode($json, true);      
        
    } else {
        $jsonArray = [];
    }

    if (checkLogin($nickname, $password)) {
        if (!array_key_exists(getUuid($nickname), $jsonArray)) {
            $jsonArray[getUuid($nickname)] = [];
        }
    } else {
        $_SESSION["errorMessage"] = "Impossible de trouver ces identifiants dans la base de donnée.";
        header("Location: ../register.php");
        exit;
    }

    file_put_contents($filePath, json_encode($jsonArray, JSON_PRETTY_PRINT));

    $_SESSION["pseudo"] = $nickname;

    header("Location: ../home.php");
    exit;
?>