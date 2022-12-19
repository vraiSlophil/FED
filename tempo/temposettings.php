<?php
session_start();

if (!isset($_SESSION["pseudo"])){
    $_SESSION["errorMessage"] = "Une erreur inopinée est survenue.";
    header("Location: ../login.php");
    exit;
}

header("Location: ../settings.php");
exit;
?>