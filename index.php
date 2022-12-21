<html lang="fr">
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
require_once "app/database.php";
$database = new Database();


if (isset($_POST["register_name"]) && isset($_POST["register_email"]) && isset($_POST["register_password"])) {
    $create = $database->createUser($_POST["register_name"], $_POST["register_password"], $_POST["register_email"]);
    if (is_string($create)) {
        $_SESSION["register_error"] = $create;
        header("Location: register.php");
        exit;
    }
    $_SESSION["login"] = intval($create);

}

if (isset($_POST["login_name"]) && isset($_POST["login_password"])) {
    $log = $database->login($_POST["login_name"], $_POST["login_password"]);
    if (is_string($log)) {
        $_SESSION["login_error"] = $log;
        header("Location: login.php");
        exit;
    }
    $_SESSION["login"] = intval($log);
}

if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

require_once "app/css.php";

$login = $_SESSION["login"];
?>
<head>
    <meta charset="UTF-8">
    <title>FED | To-do list</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="icon" href="images/fed-logo-white-background.png">
    <style>
        :root {
            --light-background-color: <?php echo $_SESSION["lightBackgroundColor"];?>;
            --background-color: <?php echo $_SESSION["backgroundColor"];?>;
            --border-color: <?php echo $_SESSION["borderColor"];?>;
            --font-color: <?php echo $_SESSION["fontColor"];?>;
            --font-button-color: <?php echo $_SESSION["fontButtonColor"];?>;
            --light-font-button-color: <?php echo $_SESSION["lightFontButtonColor"];?>;
            --dark-font-button-color: <?php echo $_SESSION["darkFontButtonColor"];?>;
            --image-white: <?php echo $_SESSION["imageWhite"];?>;
        }
    </style>
</head>
<body>
<header id="header">
    <div id="headercontent">
        <div id="settings">
            <p><?php echo $database->getName($login); ?></p>
            <a href="settings.php">
                <img src="<?php echo $database->getProfilePictureUrl($login); ?>" alt="profile picture" id="image">
            </a>
        </div>
    </div>
    <div id="headercontent">
        <div id="title">
            <img src="images/fed-logo.png" alt="logo">
            F∃D
        </div>
    </div>
</header>
<main id="main">
    <div id="card">
        <div id="card_header">
            <h3>Titre de la carte</h3>
            <button id="toggle_button">Afficher/masquer</button>
        </div>
        <div id="card_content">
            <p>Contenu de la carte</p>
            <p>Contenu de la carte</p>
            <p>Contenu de la carte</p>
        </div>
    </div>
</main>

</body>
</html>