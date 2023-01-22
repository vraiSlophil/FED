<?php
session_start();
if (isset($_SESSION["login"])) unset($_SESSION["login"]);
?>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>FED - Enregistrement</title>
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
        <?php if (isset($_SESSION["register_error"])) { ?>
        <p>
            <?php
                echo $_SESSION["register_error"];
                unset($_SESSION["register_error"]);
            ?>
        </p>
        <?php } ?>
        <form action="index.php" method="post" id="form">
            <div id="pseudo">
                <img src="images/identifier.png">
                <input type="text" name="register_name" placeholder="Votre nom d'utilisateur">
            </div>
            <div id="email">
                <img src="images/email.png">
                <input type="email" name="register_email" placeholder="Votre email">
            </div>
            <div id="password">
                <img src="images/lock.png">
                <input type="password" name="register_password" id="mdp" placeholder="Votre mot de passe">
            </div>
            <input type="submit" value="Créer mon compte" id="button">
        </form>
        <div id="register">
            <a href="login.php">Vous avez déjà un compte ?</a>
        </div>
    </section>
</body>
</html>