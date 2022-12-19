<?php 
    session_start();

    $cssPath = "../json/css.json";

    if (file_exists($cssPath)) {
        $cssJson = file_get_contents($cssPath);
        $cssJsonArray = json_decode($cssJson, true);
    } else {
        header("Location: ../login.php");
        exit;
    }

    if(isset($_SESSION["theme"])){
        $theme = $_SESSION["theme"];
    } else {
        $_SESSION["theme"] = "lighttheme";
        $theme = $_SESSION["theme"];
    }

    $targetTheme = $_POST["targetTheme"];
    $_SESSION["theme"] = $targetTheme;

    header("Location: ../" .$_POST["sourcePage"]. ".php");
    exit;
?>