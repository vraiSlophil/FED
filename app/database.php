<?php
require_once "database_info.php";

class Database
{
    private function sql_connect()
    {
        global $db;
        global $pt;
        global $ue;
        global $pd;

        try {
            $sch = 'mysql:host=localhost;dbname=' . $db . ';port=' . $pt;
            $bdd = new PDO($sch, $ue, $pd);
        } catch (Exception $e) {
            die('Erreur : ' . $e->getMessage());
        }
        return $bdd;
    }

    public function createUser(string $username, string $password, string $email, string $firstName = null, string $lastName = null, string $profilePictureUrl = null): int|string
    {
        $salt = uniqid();
        $hashed_password = hash('sha256', $password . $salt);
        if ($profilePictureUrl == null) {
            $query = "INSERT INTO users (username, password, salt, email, first_name, last_name) VALUES (:username, :password, :salt, :email, :first_name, :last_name);";
        } else {
            $query = "INSERT INTO users (username, password, salt, email, first_name, last_name, profile_picture_url) VALUES (:username, :password, :salt, :email, :first_name, :last_name, :profile_picture_url);";
        }
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':password', $hashed_password);
        $stmt->bindValue(':salt', $salt);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':first_name', $firstName);
        $stmt->bindValue(':last_name', $lastName);
        if ($profilePictureUrl != null) {
            $stmt->bindValue(':profile_picture_url', $profilePictureUrl);
        }

        // Exécuter la requête
        try {
            $stmt->execute();
            return intval($pdo->lastInsertId());
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                // Code d'erreur MySQL 1062: erreur de clé unique
                return "Error, an other account is using this user name.";
            } else if ($e->errorInfo[1] == 1452) {
                // Code d'erreur MySQL 1452: erreur de clé étrangère
                return "Error, your email is invalid";
            } else if ($e->errorInfo[1] == 1406) {
                return "Error, a form value is invalid.";
            } else {
                return "An unknown error has occurred. Please contact an administrator. (Error code : " . $e->errorInfo[1] . ")";
            }
        }
    }

    public function createTheme(int $authorId, string $themeName): array
    {
        $pdo = $this->sql_connect();

        $stmt = $pdo->prepare("INSERT INTO themes (author_id, theme_name) VALUES (:author_id, :theme_name);");
        $stmt->bindParam(":author_id", $authorId);
        $stmt->bindParam(":theme_name", $themeName);


        try {
            $stmt->execute();
            return ["id" => intval($pdo->lastInsertId()), "title" => $themeName];
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1452) {
                return ["error" => "Error, the specified color is invalid."];
            } else {
                return ["error" => "An unknown error has occurred. Please contact an administrator. (Error code : " . $e->errorInfo[1] . ")"];
            }
        }
    }

    public function login(string $username, string $password)
    {
        // Connexion à la base de données
        $pdo = $this->sql_connect();

        // Requête SQL pour récupérer les informations de l'utilisateur avec le nom d'utilisateur spécifié
        $stmt = $pdo->prepare("SELECT user_id, password, salt FROM users WHERE username = :username;");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $user = $stmt->fetch();

        // Si aucun utilisateur n'a été trouvé avec ce nom d'utilisateur, retourne faux
        if (!$user) {
            return "Error, this username was not found.";
        }

        // Hash le mot de passe entré par l'utilisateur avec le salt de cet utilisateur
        $hashed_password = hash('sha256', $password . $user['salt']);

        // Si le mot de passe hashé ne correspond pas au mot de passe enregistré pour cet utilisateur, retourne faux
        if ($hashed_password != $user['password']) {
            return "Error, it's not the expected password";
        }

        // Si l'utilisateur a été trouvé et le mot de passe vérifié, retourne l'ID de l'utilisateur
        return intval($user['user_id']);
    }

    public function getProfilePictureUrl(int $id): string
    {
        $pdo = $this->sql_connect();
        $query = "SELECT profile_picture_url FROM users WHERE user_id = :id;";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['profile_picture_url'];
    }

    public function getName(int $id)
    {
        $pdo = $this->sql_connect();
        $query = "SELECT username, first_name, last_name FROM users WHERE user_id = :id;";
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

    public function getEmail(int $id_user): ?string
    {
        $query = "SELECT email FROM users WHERE user_id = :id_user";
        $stmt = $this->sql_connect()->prepare($query);
        $stmt->bindParam(":id_user", $id_user, PDO::PARAM_INT);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['email'];
        } catch (PDOException $e) {
            return "";
        }
    }

    function editTask(int $taskId, string $newTaskName): bool
    {
        // Connecter à la base de données
        $pdo = $this->sql_connect();

        // Préparer la requête SQL pour mettre à jour le nom de la tâche
        $query = "UPDATE tasks SET title = :newTaskName WHERE task_id = :taskId;";
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

    public function deleteTask(int $task_id): bool
    {
        $query = "DELETE FROM tasks WHERE task_id = :task_id";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(":task_id", $task_id, PDO::PARAM_INT);
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function updateTaskStatus(int $task_id, bool $status): bool
    {
        $query = "UPDATE tasks SET task_status=:status WHERE task_id=:task_id";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(":task_id", $task_id, PDO::PARAM_INT);
        $stmt->bindValue(":status", $status, PDO::PARAM_BOOL);
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getThemeTitle(int $id): string
    {
        // Établir la connexion à la base de données
        $pdo = $this->sql_connect();

        // Préparer la requête SQL pour récupérer le titre du thème
        $query = "SELECT theme_name FROM themes WHERE theme_id = :id;";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id', $id);

        // Exécuter la requête
        $stmt->execute();

        // Récupérer le résultat de la requête
        $result = $stmt->fetch();
        return $result['theme_name'];
    }

    public function getThemeColor(int $theme_id): string
    {
        $query = "SELECT theme_color FROM themes WHERE theme_id=:theme_id";
        $stmt = $this->sql_connect()->prepare($query);
        $stmt->bindParam(":theme_id", $theme_id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['theme_color'];
    }

    public function editThemeColor(int $theme_id, string $color): bool
    {
        // Vérifie si la couleur est dans le bon format
        if (!preg_match("/#[a-fA-F0-9]{6}/", $color)) {
            return false;
        }
        // Prépare la requête SQL
        $query = "UPDATE themes SET theme_color = :color WHERE theme_id = :theme_id";
        $stmt = $this->sql_connect()->prepare($query);
        $stmt->bindParam(":color", $color);
        $stmt->bindParam(":theme_id", $theme_id, PDO::PARAM_INT);
        // Exécute la requête
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }


    public function getThemeAuthor(int $theme_id): int
    {
        $query = "SELECT author_id FROM themes WHERE theme_id = :theme_id;";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':theme_id', $theme_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchColumn();
    }

    public function deleteTheme(int $theme_id): array|bool
    {
        $query = "DELETE FROM `themes` WHERE theme_id = :theme_id;
                DELETE FROM `authorized_themes` WHERE theme_id = :theme_id;
                DELETE FROM `tasks` WHERE theme_id = :theme_id;";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':theme_id', $theme_id, PDO::PARAM_INT);

        // Exécuter la requête
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            // Si une erreur est survenue lors de l'exécution de la requête, retourner false
            return [false, "An unknown error has occurred. Please contact an administrator. (Error code : " . $e->errorInfo[1] . ")"];
        }
    }

    public function editThemeTitle(int $theme_id, string $new_title): bool
    {
        // Préparer la requête pour mettre à jour le titre du thème
        $query = "UPDATE themes SET theme_name = :new_title WHERE theme_id = :theme_id;";
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

    public function getThemes(int $id_user): array
    {
        $query = "SELECT t.theme_id FROM themes t LEFT JOIN authorized_themes a ON a.theme_id = t.theme_id WHERE t.author_id = :id_user OR a.user_id = :id_user;";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':id_user', $id_user, PDO::PARAM_INT);
        $stmt->execute();

        $themes = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $value) {
            $themes[] = (int)$value['theme_id'];
        }
        return $themes;
    }

    public function getTasks(int $theme_id): array|bool
    {
        $pdo = $this->sql_connect();
        $query = "SELECT task_id, title, task_status FROM tasks WHERE theme_id = :theme_id;";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':theme_id', $theme_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public function addAuthorizedUser(string $username, int $theme_id): bool
    {
        $query = "INSERT INTO authorized_themes (user_id, theme_id) SELECT users.user_id, themes.theme_id FROM users INNER JOIN themes ON users.username = :username AND themes.theme_id = :theme_id;";
        $pdo = $this->sql_connect();
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':theme_id', $theme_id);
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function createTask(int $theme_id, string $task_name, int $task_author_id, bool $task_status = false): int|string
    {
        $pdo = $this->sql_connect();
        $query = "INSERT INTO tasks (title, user_id, theme_id, task_status) VALUES (:task_name, :author_id, :theme_id, :task_status);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":task_name", $task_name);
        $stmt->bindParam(":author_id", $task_author_id, PDO::PARAM_INT);
        $stmt->bindParam(":theme_id", $theme_id, PDO::PARAM_INT);
        $stmt->bindParam(":task_status", $task_status, PDO::PARAM_BOOL);

        try {
            $stmt->execute();
            return intval($pdo->lastInsertId());
        } catch (PDOException $e) {
            return "An unknown error has occurred. Please contact an administrator. (Error code : " . $e->errorInfo[1] . ")";
        }
    }

    public function deleteAuthorizedUser(int $user_id, string $theme_id): bool
    {
        $query = "DELETE FROM authorized_themes WHERE user_id = :user_id AND theme_id=:theme_id";
        $stmt = $this->sql_connect()->prepare($query);
        $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
        $stmt->bindParam(":theme_id", $theme_id);
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function updateProfilePicture(int $userId): bool
    {
        $query = "UPDATE users SET profile_picture_url = (CONCAT('images/profile_picture/', :userId, '.jpg')) WHERE user_id = :userId";
        $stmt = $this->sql_connect()->prepare($query);
        $stmt->bindParam(":userId", $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getFirstName(int $userId): string
    {
        $query = "SELECT first_name FROM users WHERE user_id = :userId";
        $stmt = $this->sql_connect()->prepare($query);
        $stmt->bindParam(":userId", $userId, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['first_name'] ?: "";
    }

    public function getLastName(int $userId): string
    {
        $query = "SELECT last_name FROM users WHERE user_id = :userId";
        $stmt = $this->sql_connect()->prepare($query);
        $stmt->bindParam(":userId", $userId, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['last_name'] ?: "";
    }


}