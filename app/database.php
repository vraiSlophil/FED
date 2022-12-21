<?php

class Database {

    private function sql_connect() {
        require "database_info.php";

        global $db;
        global $pt;
        global $ue;
        global $pd;

        try {
            $sch='mysql:host=localhost;dbname='.(string)$db.';port='.(string)$pt;
            $bdd = new PDO($sch , $ue, $pd);
        }
        catch(Exception $e) {
            die('Erreur : '.$e->getMessage());
        }
        return $bdd;
    }

    public function createUser($username, $password, $email, $firstName = null, $lastName = null, $profilePictureUrl = null): bool|string {
        $salt = uniqid();
        $hashed_password = hash('sha256', $password . $salt);
        $query = "INSERT INTO users (username, password, salt, email, first_name, last_name, profile_picture_url) VALUES (:username, :password, :salt, :email, :first_name, :last_name, :profile_picture_url)";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':password', $hashed_password);
        $stmt->bindValue(':salt', $salt);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':first_name', $firstName);
        $stmt->bindValue(':last_name', $lastName);
        $stmt->bindValue(':profile_picture_url', $profilePictureUrl);

        // Exécuter la requête
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                // Code d'erreur MySQL 1062: erreur de clé unique
                return "Un compte avec ce nom d'utilisateur ou cet email existe déjà.";
            } else if ($e->errorInfo[1] == 1452) {
                // Code d'erreur MySQL 1452: erreur de clé étrangère
                return "Adresse email non valide.";
            } else if ($e->errorInfo[1] == 1406) {
                return "Votre nom d'utilisateur, votre email, ou votre mot de passe est trop long.";
            } else {
                return "Une erreur inconnue s'est produite lors de la création du compte. Veuillez contacter un administrateur.";
            }
        }
    }

    public function createTheme($theme_name, $theme_color): bool|string {
        $pdo = $this->sql_connect();

        $stmt = $pdo->prepare("INSERT INTO themes (theme_name, theme_color) VALUES (:theme_name, :theme_color)");
        $stmt->bindParam(":theme_name", $theme_name);
        $stmt->bindParam(":theme_color", $theme_color);

        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
             if ($e->errorInfo[1] == 1452) {
                return "La couleur spécifiée n'est pas valide.";
            } else {
                return "Une erreur inconnue s'est produite lors de la création du compte. Veuillez contacter un administrateur.";
            }
        }
    }

    public function login($username, $password) {
        // Connexion à la base de données
        $pdo = $this->sql_connect();

        // Requête SQL pour récupérer les informations de l'utilisateur avec le nom d'utilisateur spécifié
        $stmt = $pdo->prepare("SELECT user_id, password, salt FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $user = $stmt->fetch();

        // Si aucun utilisateur n'a été trouvé avec ce nom d'utilisateur, retourne faux
        if (!$user) {
            return false;
        }

        // Hash le mot de passe entré par l'utilisateur avec le salt de cet utilisateur
        $hashed_password = hash('sha256', $password . $user['salt']);

        // Si le mot de passe hashé ne correspond pas au mot de passe enregistré pour cet utilisateur, retourne faux
        if ($hashed_password != $user['password']) {
            return false;
        }

        // Si l'utilisateur a été trouvé et le mot de passe vérifié, retourne l'ID de l'utilisateur
        return $user['user_id'];
    }


}    
?>

