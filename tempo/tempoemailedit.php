<?php 
    session_start();

    include_once "../app/database.php";

    $pseudo = $_SESSION["pseudo"];
    $password = md5(trim($_POST["mdp"]));
    $newemail = trim($_POST["newemail"]);
    $email = getEmail($nickname);

    if ($pseudo == "" or $password == "" or $newemail == "" || !(filter_var($email, FILTER_VALIDATE_EMAIL))) {
        $_SESSION["errorMessage"] = "Un élément est invalide.";
        header("Location: ../settings.php");
        exit;
    }

    if ($newemail == $email) {
        $_SESSION["errorMessage"] = "L'email ne peut pas être le même que l'ancien.";
        header("Location: ../settings.php");
        exit;
    }

    if (getPassword($nickname) != $password) {
        $_SESSION["errorMessage"] = "Le mot de passe est incorrect";
        header("Location: ../settings.php");
        exit;
    }

    setEmail($newemail, $nickname);

    header("Location: ../settings.php");
    exit;
?>