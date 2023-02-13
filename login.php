<?php
session_start();
if (isset($_SESSION["login"])) unset($_SESSION["login"]);
?>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>FED - Connexion</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="icon" href="images/fed-logo-white-background.png">
</head>
<body>
    <header id="header">
        <div></div>
        <div id="header__head">
            <img src="images/fed-logo.png" alt="logo">
            FED
        </div>
    </header>
    <section id="connectform">
        <?php if (isset($_SESSION["login_error"])) { ?>
            <p>
                <?php
                echo $_SESSION["login_error"];
                unset($_SESSION["login_error"]);
                ?>
            </p>
        <?php } ?>
        <form action="index.php" method="post" id="form">
            <div id="pseudo">
                <img src="images/profile_picture/identifier.png">
                <input type="text" name="login_name" placeholder="Votre nom d'utilisateur">
            </div>
            <div id="password">
                <img src="images/lock.png">
                <input type="password" name="login_password" id="mdp" placeholder="Votre mot de passe">
            </div>
            <input type="submit" value="Connexion" id="button">
        </form>
        <div id="register">
            <a href="register.php">Vous n'avez pas de compte ?</a>
        </div>
    </section>

</body>
</html>