<html lang="fr">
<?php
    session_start();
//    include "app/css.php";
//    include "app/database.php";

?>
<head>
    <meta charset="UTF-8">
    <title>FED - Paramètres</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="icon" href="images/fed-logo-white-background.png">
    <script src="script/script.js"></script>
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
        <div id="leave">
            <a href="home.php"><img src="images/horizontalarrow.png" alt="logout"></a>
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
<section id="parameters">
    <div id="pseudo">
        <p><?php echo $nickname;?></p>
        <img src="images/edit.png" alt="edit" onclick="toggleVisibilityNicknameEdit();">
    </div>
    <div id="password">
        <p>●●●●●●●●●</p>
        <img src="images/edit.png" alt="edit" onclick="toggleVisibilityPasswordEdit();">
    </div>
    <div id="email">
        <p><?php echo $email;?></p>
        <img src="images/edit.png" alt="edit" onclick="toggleVisibilityEmailEdit();">
    </div>
    <a href="login.php" id="logout">Se déconnecter</a>
</section>

<!-- menus de modification -->

<section class="hide" id="nicknameedit">
    <form action="script_php/temponicknameedit.php" method="post">
        <div id="password">
            <img src="images/lock.png">
            <input type="password" name="password" placeholder="Mot de passe">
        </div>
        <div id="newnickname">
            <img src="images/identifier.png">
            <input type="text" name="newnickname" placeholder="Nouveau pseudo">
        </div>
        <input type="submit" value="Valider">
        <div onclick="toggleVisibilityNicknameEdit();" id="cancel">Annuler</div>
    </form>
</section>

<section class="hide" id="passwordedit">
    <form action="script_php/tempopasswordedit.php" method="post">
        <div id="lastpassword">
            <img src="images/lock.png">
            <input type="password" name="lastpassword" placeholder="Ancien mot de passe">
        </div>
        <div id="newpassword">
            <img src="images/lock.png">
            <input type="password" name="newpassword" placeholder="Nouveau mot de passe">
        </div>
        <input type="submit" value="Valider">
        <div onclick="toggleVisibilityPasswordEdit();" id="cancel">Annuler</div>
    </form>
</section>

<section class="hide" id="emailedit">
    <form action="script_php/tempoemailedit.php" method="post">
        <div id="password">
            <img src="images/lock.png">
            <input type="password" name="password" placeholder="Mot de passe">
        </div>
        <div id="newemail">
            <img src="images/email.png">
            <input type="email" name="newemail" placeholder="Nouvelle adresse email">
        </div>
        <input type="submit" value="Valider">
        <div onclick="toggleVisibilityEmailEdit();" id="cancel">Annuler</div>
    </form>
</section>

</body>
</html>