<?php 
    session_start();
    include_once "../app/database.php";

    $nickname = $_SESSION["pseudo"];
    $password = trim(md5($_POST["password"]));
    $newnickname = trim($_POST["newnickname"]);

    if ($nickname == "" or $password == "" or $newnickname == "") {
        $_SESSION["errorMessage"] = "Le nom d'utilisateur ou le mot de passe est invalide.";
        header("Location: ../settings.php");
        exit;
    }

    if ($nickname == $newnickname) {
        $_SESSION["errorMessage"] = "Le nom d'utilisateur ne peut pas être le même que l'ancien.";
        header("Location: ../settings.php");
        exit;
    }

    if (getPassword($nickname) != $password) {
        $_SESSION["errorMessage"] = "Le mot de passe est incorrect";
        header("Location: ../settings.php");
        exit;
    }

    if (verifyNickname($newnickname)) {
        $_SESSION["errorMessage"] = "Ce pseudo est déjà utilisé.";
        header("Location: ../register.php");
        exit;
    }

    $uuid = getUuid($nickname);
    setNickname($newnickname, $uuid);

    $_SESSION["pseudo"] = $newnickname;

    header("Location: ../settings.php");
    exit;
?> 