<!doctype html>
<html lang="fr">
<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
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
    header("Location: index.php");
    exit;

}

if (isset($_POST["login_name"]) && isset($_POST["login_password"])) {
    $log = $database->login($_POST["login_name"], $_POST["login_password"]);
    if (is_string($log)) {
        $_SESSION["login_error"] = $log;
        header("Location: login.php");
        exit;
    }
    $_SESSION["login"] = intval($log);
    header("Location: index.php");
    exit;
}

if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

$login = $_SESSION["login"];
?>
<head>
    <meta charset="UTF-8">
    <title>FED | To-do list</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/move.css">
    <link rel="stylesheet" href="style/chest.css">
    <link rel="icon" href="images/fed-logo-white-background.png">
</head>
<body>
<header id="header">
    <div id="header__profile">
        <a href="settings.php">
            <img src="<?php echo $database->getProfilePictureUrl($login); ?>" alt="profile picture">
        </a>
        <p><?php echo $database->getName($login); ?></p>
    </div>
    <div id="header__head">
        <img src="images/fed-logo.png" alt="logo">
        FED
    </div>
    <button id="header__chest">
        <div id="header__chest__container">
            <div id="logo">
                <div class="box">
                    <div class="side front"></div>
                    <div class="side left"></div>
                    <div class="side back"></div>
                    <div class="side right"></div>
                    <div class="side bottom"></div>
                    <div class="flap front"></div>
                    <div class="flap back"></div>
                    <div class="flap left"></div>
                    <div class="flap right"></div>
                </div>
            </div>
        </div>
    </button>
</header>
<main id="main">
    <div id="main__theme_list"></div>
    <div id="context-menu">
        <div id="new">
            <p class="context-option">Nouveau thème</p>
            <div class="block main__card">
                <div id="main__card__header">
                    <h3 id="main__card__header__title">Une erreur est survenue.</h3>
                    <div>
                        <button id="main__card__header__put_int_button"><img src="images/put-in.png" alt="put in box"></button>
                        <button id="main__card__header__add_people_button"><img src="images/add-group.png" alt="add people"></button>
<!--                        <button id="main__card__header__edit_color_button" style="display: none;"><img src="images/color-picker.png" alt="edit task color"></button>-->
                        <input id="main__card__header__edit_color_button" type="color" style="display: none;">
                        <button id="main__card__header__edit_button" style="display: none;"><img src="images/edit.png" alt="edit task title"></button>
                        <button id="main__card__header__validate_button" style="display: none;"><img src="images/check.png" alt="validate edits"></button>
                        <button id="main__card__header__toggle_content_button"><img src="images/show-more.png" alt="⯆"></button>
                        <button id="main__card__header__delete_button"><img src="images/poubelle.png" alt="delete todo theme"></button>
                    </div>
                </div>
                <div id="main__card__content">
                    <div id="main__card__content__tasks">
                    </div>
                    <div id="main__card__content__interactive">
                        <input id="main__card__content__interactive__input" type="text" placeholder="Ajouter une tâche">
                        <button id="main__card__content__interactive__add_task_button"><img src="images/add.png" alt="add task"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="root"></div>
</main>
<script src="script/class.js"></script>
<script src="script/script.js"></script>
<script src="script/app.js"></script>
</body>
</html>