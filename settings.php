<html lang="fr">
<?php
session_start();

if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

include "app/database.php";
$database = new Database();


if (isset($_POST['submit_image'])) {
    // Récupérer l'image téléchargée
    $image = $_FILES['image'];
    $image_name = $image['name'];
    $image_tmp = $image['tmp_name'];
    $image_size = $image['size'];
    $image_error = $image['error'];

    // Vérifier si l'image a été téléchargée correctement
    if ($image_error == 0) {
        // Lire les données de l'image
        $image = imagecreatefromstring(file_get_contents($image_tmp));

        // Redimensionner l'image
        $thumbnail = imagecreatetruecolor(128, 128);
        imagecopyresampled($thumbnail, $image, 0, 0, 0, 0, 128, 128, imagesx($image), imagesy($image));

        // Enregistrer l'image
        imagejpeg($thumbnail, './images/profile_picture/' . $_SESSION["login"] . '.jpg');

        // Libérer la mémoire utilisée pour l'image
        imagedestroy($image);
        imagedestroy($thumbnail);

        $database->updateProfilePicture($_SESSION["login"]);
        header("Location: settings.php");
        exit();
    }
}

?>
<body>
<header id="header">
    <div id="headercontent">
        <div id="leave">
            <a href="index.php"><img src="images/horizontalarrow.png" alt="logout"></a>
        </div>
    </div>
    <div id="header__head">
        <img src="images/fed-logo.png" alt="logo">
        FED
    </div>
</header>
<main id="main">
    <?php
    if(isset($_SESSION["errorMessage"])) {
        echo "<p>".$_SESSION["errorMessage"]."</p>";
        unset($_SESSION["errorMessage"]);
    }
    ?>
</main>
<section id="settings_container">
    <div id="settings_container__settings">
        <div id="settings_container__settings__profile_picture">
            <img src="<?=$database->getProfilePictureUrl($_SESSION["login"])?>" alt="profile picture" class="NO-CACHE">
            <form action="settings.php" method="post" enctype="multipart/form-data">
                <input type="file" name="image" id="image" accept="image/*" hidden>
                <label for="image">Choisir une image</label>
                <input type="submit" name="submit_image" value="Valider">
            </form>
        </div>
        <div id="settings_container__settings__texts">
            <div id="settings_container__settings__username">
                <p><?=htmlspecialchars($database->getName($_SESSION["login"]))?></p>
                <button id="settings_container__settings__username__validate_button" style="display: none;">
                    <img src="images/check.png" alt="validate">
                </button>
                <button id="settings_container__settings__username__edit_button">
                    <img src="images/edit.png" alt="edit">
                </button>
            </div>
            <div id="settings_container__settings__password">
                <p>●●●●●●●●●</p>
                <button id="settings_container__settings__password__validate_button" style="display: none;">
                    <img src="images/check.png" alt="validate">
                </button>
                <button id="settings_container__settings__password__edit_button">
                    <img src="images/edit.png" alt="edit">
                </button>
            </div>
            <div id="settings_container__settings__email">
                <p><?=htmlspecialchars($database->getEmail($_SESSION["login"]))?></p>
                <button id="settings_container__settings__email__validate_button" style="display: none;">
                    <img src="images/check.png" alt="validate">
                </button>
                <button id="settings_container__settings__email__edit_button">
                    <img src="images/edit.png" alt="edit">
                </button>
            </div>
            <div id="settings_container__settings__first_name">
                <p><?=htmlspecialchars($database->getFirstName($_SESSION["login"]))?></p>
                <button id="settings_container__settings__first_name__validate_button" style="display: none;">
                    <img src="images/check.png" alt="validate">
                </button>
                <button id="settings_container__settings__first_name__edit_button">
                    <img src="images/edit.png" alt="edit">
                </button>
            </div>
            <div id="settings_container__settings__last_name">
                <p><?=htmlspecialchars($database->getLastName($_SESSION["login"]))?></p>
                <button id="settings_container__settings__last_name__validate_button" style="display: none;">
                    <img src="images/check.png" alt="validate">
                </button>
                <button id="settings_container__settings__last_name__edit_button">
                    <img src="images/edit.png" alt="edit">
                </button>
            </div>
            <a href="login.php" id="settings_container__settings__logout">Se déconnecter</a>
        </div>
    </div>
</section>

<!-- menus de modification -->
<!---->
<!--<section class="hide" id="nicknameedit">-->
<!--    <form action="script_php/temponicknameedit.php" method="post">-->
<!--        <div id="password">-->
<!--            <img src="images/lock.png">-->
<!--            <input type="password" name="password" placeholder="Mot de passe">-->
<!--        </div>-->
<!--        <div id="newnickname">-->
<!--            <img src="images/profile_picture/identifier.png">-->
<!--            <input type="text" name="newnickname" placeholder="Nouveau pseudo">-->
<!--        </div>-->
<!--        <input type="submit" value="Valider">-->
<!--        <div onclick="toggleVisibilityNicknameEdit();" id="cancel">Annuler</div>-->
<!--    </form>-->
<!--</section>-->
<!---->
<dialog id="password_dialog">
    <div id="password_dialog__form">
        <div id="password_dialog__form__actual_password">
            <img src="images/lock.png">
            <input type="password" name="actual_password" placeholder="Ancien mot de passe">
        </div>
        <div id="password_dialog__form__new_password">
            <img src="images/lock.png">
            <input type="password" name="new_password" placeholder="Nouveau mot de passe">
        </div>
        <div id="password_dialog__form__button_container">
            <button id="password_dialog__form__submit_button" type="submit">Valider</button>
            <button id="password_dialog__form__cancel_button" type="reset">Annuler</button>
        </div>
    </div>
</dialog>

<!---->
<!--<section class="hide" id="emailedit">-->
<!--    <form action="script_php/tempoemailedit.php" method="post">-->
<!--        <div id="password">-->
<!--            <img src="images/lock.png">-->
<!--            <input type="password" name="password" placeholder="Mot de passe">-->
<!--        </div>-->
<!--        <div id="newemail">-->
<!--            <img src="images/email.png">-->
<!--            <input type="email" name="newemail" placeholder="Nouvelle adresse email">-->
<!--        </div>-->
<!--        <input type="submit" value="Valider">-->
<!--        <button onclick="toggleVisibilityEmailEdit();" id="cancel">Annuler</button>-->
<!--    </form>-->
<!--</section>-->
<script src="script/settingsSection.js"></script>
<script src="script/script.js"></script>
</body>
<head>
    <meta charset="UTF-8">
    <title>FED - Paramètres</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/settings.css">
    <link rel="icon" href="images/fed-logo-white-background.png">
</head>
</html>