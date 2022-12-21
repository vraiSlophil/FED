<html lang="fr">

<?php
session_start();
require_once "app/css.php";

if (isset($_SESSION["login"])) {
    unset($_SESSION["login"]);
}

?>

<head>
    <meta charset="UTF-8">
    <title>FED - Connexion</title>
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
            <div id="title">
                <img src="images/fed-logo.png" alt="logo">
                F∃D
            </div>
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
                <img src="images/identifier.png">
                <input type="text" name="login_name" placeholder="Votre nom d'utilisateur">
            </div>
            <div id="password">
                <img src="images/lock.png">
                <input type="password" name="login_password" id="mdp" placeholder="Votre mot de passe">
            </div>
            <input type="submit" value="Connexion" id="button">
        </form>
    </section>
    <section id="register">
        <a href="register.php">Vous n'avez pas de compte ?</a>
    </section>
    
</body>
</html>