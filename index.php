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

require_once "app/css.php";

$login = $_SESSION["login"];
?>
<head>
    <meta charset="UTF-8">
    <title>FED | To-do list</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/move.css">
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
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
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
    <div id="context-menu">
        <div id="new">
            <p class="context-option">new</p>
            <div class="block" id="main__card">
                <div id="main__card__header">
                    <h3 id="main__card__header__title">Titre de la carte</h3>
                    <div>
                        <button id="main__card__header__add_people_button"><img src="images/add-group.png" alt="add people"></button>
                        <button id="main__card__header__edit_button" style="display: none;"><img src="images/edit.png" alt="edit task title"></button>
                        <button id="main__card__header__validate_button" style="display: none;"><img src="images/check.png" alt="validate edits"></button>
                        <button id="main__card__header__toggle_content_button"><img src="images/show-more.png" alt="⯆"></button>
                        <button id="main__card__header__delete_button"><img src="images/poubelle.png" alt="delete todo theme"></button>
                    </div>
                </div>
                <div id="main__card__content">
                    <div id="main__card__content__tasks">
                        <div id="main__card__content__tasks__task">
                            <p>Contenu de la carte</p>
                            <div>
                                <input type="checkbox" id="main__card__content__tasks__task__checkbox">
                                <button id="main__card__content__tasks__task__edit_button"><img src="images/edit.png" alt="edit task content"></button>
                                <button id="main__card__content__tasks__task__validate_button" style="display: none;"><img src="images/check.png" alt="validate task"></button>
                                <button id="main__card__content__tasks__task__delete_button"><img src="images/poubelle.png" alt="delete task"></button>
                            </div>
                        </div>
                        <div id="main__card__content__tasks__task">
                            <p>Contenu de la carte</p>
                            <div>
                                <input type="checkbox" id="main__card__content__tasks__task__checkbox">
                                <button id="main__card__content__tasks__task__edit_button"><img src="images/edit.png" alt="edit task content"></button>
                                <button id="main__card__content__tasks__task__validate_button" style="display: none;"><img src="images/check.png" alt="validate task"></button>
                                <button id="main__card__content__tasks__task__delete_button"><img src="images/poubelle.png" alt="delete task"></button>
                            </div>
                        </div>
                        <div id="main__card__content__tasks__task">
                            <p>Contenu de la carte</p>
                            <div>
                                <input type="checkbox" id="main__card__content__tasks__task__checkbox">
                                <button id="main__card__content__tasks__task__edit_button"><img src="images/edit.png" alt="edit task content"></button>
                                <button id="main__card__content__tasks__task__validate_button" style="display: none;"><img src="images/check.png" alt="validate task"></button>
                                <button id="main__card__content__tasks__task__delete_button"><img src="images/poubelle.png" alt="delete task"></button>
                            </div>
                        </div>
                    </div>
                    <div id="main__card__content__interactive">
                        <input id="main__card__content__interactive__input" type="text" placeholder="Ajouter une tâche">
                        <button id="main__card__content__interactive__add_task_button"><img src="images/add.png" alt="add task"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="root">
<!--        <canvas id="canvas"></canvas>-->
    </div>
</main>
<script src="script/class.js"></script>
<script src="script/script.js"></script>
<script src="script/app.js"></script>
</body>
</html>