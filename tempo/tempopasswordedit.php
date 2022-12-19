<?php
    session_start();
    include_once "../app/database.php";

    $nickname = $_SESSION["pseudo"];
    $lastpassword = md5(trim($_POST["lastpassword"]));
    $newpassword = mysqli_real_escape_string($conn, md5(trim($_POST["newpassword"])));

    if (getPassword($nickname) != $lastpassword) {
        $_SESSION["errorMessage"] = "Le mot de passe est incorrect.";
        header("Location: ../login.php");
        exit;
    } else {
        setPassword($nickname, mysqli_real_escape_string($conn, $newpassword));
    }

    header("Location: ../settings.php");
    exit;
?> 