<html lang="fr">

<?php 
session_start();
unset($_SESSION["pseudo"]);
include "app/css.php";

$theme = "lighttheme";

if (isset($_SESSION["login"])) {
    unset($_SESSION["login"]);
}

if (isset($_POST["register_name"]) && isset($_POST["register_email"]) && isset($_POST["register_password"])) {
    include_once "app/database.php";
    $database = new Database();
    $create = $database->createUser($_POST["register_name"], $_POST["register_password"], $_POST["register_email"]);
    print_r($create);
}
?>

<head>
    <meta charset="UTF-8">
    <title>FED - Enregistrement</title>
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
        <div id="headercontent"></div>
        <div id="headercontent">
            <div id="title">
                <img src="images/<?php 
                    if($theme == "lighttheme"){
                        echo "fed-logo";
                    } else {
                        echo "fed-logo-white-background";
                    }
                ?>.png">
                F∃D
            </div>
        </div>
        <div id="headercontent">
            <div id="theme">
                <form action="tempo/tempotheme.php" method="post">
                    <input type="hidden" name="sourcePage" value="register">
                    <input type="hidden" name="targetTheme" value="<?php
                    if($theme == "lighttheme"){
                        echo "darktheme";
                    } else {
                        echo "lighttheme";
                    }
                    ?>">
                    <input type="image" src="images/<?php
                    if($theme == "lighttheme"){
                        echo "moon";
                    } else {
                        echo "sun";
                    }
                    ?>.png" name="themeButton" id="themebutton">
                </form>
            </div>
        </div>
    </header>
    <section id="connectform">
        <?php 
            if(isset($_SESSION["errorMessage"])) {
                echo "<p>".$_SESSION["errorMessage"]."</p>";
                unset($_SESSION["errorMessage"]);
            }
        ?>
        <form action="#" method="post" id="form">
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
    </section>
    <section id="register">
        <a href="login.php">Vous avez déjà un compte ?</a>
    </section>
    
</body>
</html>