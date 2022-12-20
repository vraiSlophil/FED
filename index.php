<html lang="fr">
<?php
session_start();
include_once "app/database.php";

if (!isset($_SESSION["login"])) {
    header("Location: ../login.php");
    exit;
}

include_once "app/css.php";

$db = new Database();
$login = $_SESSION["login"];
$nickname = $db->getName($login);
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
        <div id="logout">
            <p><?php echo $nickname; ?></p>
            <form action="tempo/temposettings.php" method="post">
                <input type="hidden" value="<?php echo $nickname; ?>" name="nickname">
                <input type="image" src="images/settings.png" alt="settings" id="image">
            </form>
        </div>
    </div>
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
                <input type="hidden" name="sourcePage" value="home">
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
<main id="main">
    <?php 
        if(isset($_SESSION["errorMessage"])) {
            echo "<p>".$_SESSION["errorMessage"]."</p>";
            unset($_SESSION["errorMessage"]);
        }
    ?>
    <form action="tempo/tempotask.php" method="post" id="form">
        <input type="text" value="" name="newtask" placeholder="Votre tâche" id="task">
        <input type="submit" value="Ajouter la tâche" name="addtaskbutton" id="button">
    </form>
</main>

<section id="tasks">
<?php foreach($jsonArray[getUuid($nickname)] as $todo){ ?>
    <div id="newtask">
        <p id="task"><?php echo $todo;?></p>
        <form action="tempo/tempodelete.php" method="post">
            <input type="hidden" name="task" value="<?php echo $todo;?>">
            <input type="image" src="images/poubelle.png" name="deletebutton" id="deletebutton">
        </form>
    </div>
<?php } ?>
</section>
</body>
</html>