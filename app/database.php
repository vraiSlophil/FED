<?php
require_once "database_info.php";

class Database {
    private function sql_connect() {
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

    public function createUser(string $username, string $password, string $email, string $firstName = null, string $lastName = null, string $profilePictureUrl = "images/identifier.png"): int|string {
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
            return intval($pdo->lastInsertId());
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

    public function createTheme(int $authorId, string $themeName): bool|string {
        $pdo = $this->sql_connect();

        $stmt = $pdo->prepare("INSERT INTO themes (author_id, theme_name) VALUES (:author_id, :theme_name)");
        $stmt->bindParam(":author_id", $authorId);
        $stmt->bindParam(":theme_name", $themeName);

        try {
            $stmt->execute();
            return intval($pdo->lastInsertId());
        } catch (PDOException $e) {
             if ($e->errorInfo[1] == 1452) {
                return "La couleur spécifiée n'est pas valide.";
            } else {
                return "Une erreur inconnue s'est produite lors de la création du thème. Veuillez contacter un administrateur. (code d'erreur : " .strval($e->errorInfo[1]). ")";
            }
        }
    }

    public function login(string $username, string $password) {
        // Connexion à la base de données
        $pdo = $this->sql_connect();

        // Requête SQL pour récupérer les informations de l'utilisateur avec le nom d'utilisateur spécifié
        $stmt = $pdo->prepare("SELECT user_id, password, salt FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $user = $stmt->fetch();

        // Si aucun utilisateur n'a été trouvé avec ce nom d'utilisateur, retourne faux
        if (!$user) {
            return "Ce nom d'utilisateur est introuvable.";
        }

        // Hash le mot de passe entré par l'utilisateur avec le salt de cet utilisateur
        $hashed_password = hash('sha256', $password . $user['salt']);

        // Si le mot de passe hashé ne correspond pas au mot de passe enregistré pour cet utilisateur, retourne faux
        if ($hashed_password != $user['password']) {
            return "Le mot de passe entré n'est pas le bon.";
        }

        // Si l'utilisateur a été trouvé et le mot de passe vérifié, retourne l'ID de l'utilisateur
        return intval($user['user_id']);
    }

    public function getProfilePictureUrl(int $id): string {
        $pdo = $this->sql_connect();
        $query = "SELECT profile_picture_url FROM users WHERE user_id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['profile_picture_url'];
    }

    public function getName(int $id) {
        $pdo = $this->sql_connect();
        $query = "SELECT username, first_name, last_name FROM users WHERE user_id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $result = $stmt->fetch();
        if ($result['first_name'] && $result['last_name']) {
            return $result['first_name'] . ' ' . $result['last_name'];
        } else {
            return $result['username'];
        }
    }

    function editTaskName(int $taskId, string $newTaskName) {
        // Connecter à la base de données
        $pdo = $this->sql_connect();

        // Préparer la requête SQL pour mettre à jour le nom de la tâche
        $query = "UPDATE tasks SET task_name = :newTaskName WHERE task_id = :taskId";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':newTaskName', $newTaskName);
        $stmt->bindValue(':taskId', $taskId);

        // Exécuter la requête
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getThemeTitle(int $id): string {
        // Établir la connexion à la base de données
        $pdo = $this->sql_connect();

        // Préparer la requête SQL pour récupérer le titre du thème
        $query = "SELECT theme_name FROM themes WHERE theme_id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $id);

        // Exécuter la requête
        $stmt->execute();

        // Récupérer le résultat de la requête
        $result = $stmt->fetch();
        return $result['theme_name'];
    }

    public function getThemeAuthor(int $theme_id): int {
        $query = "SELECT author_id FROM themes WHERE theme_id = :theme_id";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':theme_id', $theme_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchColumn();
    }

    public function deleteTheme(int $theme_id): bool {
        $query = "DELETE FROM themes WHERE theme_id = :theme_id";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':theme_id', $theme_id, PDO::PARAM_INT);

        // Exécuter la requête
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            // Si une erreur est survenue lors de l'exécution de la requête, retourner false
            return false;
        }
    }

    public function editThemeTitle(int $theme_id, string $new_title): bool {
        // Préparer la requête pour mettre à jour le titre du thème
        $query = "UPDATE themes SET title = :new_title WHERE theme_id = :theme_id";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':new_title', $new_title);
        $stmt->bindValue(':theme_id', $theme_id, PDO::PARAM_INT);

        // Exécuter la requête
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getThemes(int $id_user): array {
        $query = "SELECT t.theme_id FROM themes t LEFT JOIN authorized_themes a ON a.theme_id = t.theme_id WHERE t.author_id = :id_user OR a.user_id = :id_user;";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_user', $id_user, PDO::PARAM_INT);
        $stmt->execute();

        $themes = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $value){
            $themes[] = (int) $value['theme_id'];
//            echo $value["theme_id"];
        }

        return $themes;
    }

    public function getTasks(int $theme_id): array|bool {
        $query = "SELECT id, title, done FROM tasks WHERE theme_id = :theme_id";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':theme_id', $theme_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }


}