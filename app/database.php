<?php

class Database {
    function dbConnect(){
        include "database_info.php";

        try { 
            $sch='mysql:host=localhost;dbname='.$database.';port='.$port;
            $bdd = new PDO($sch , $username, $password);
        }
        catch(Exception $e) {
            die('Erreur : '.$e->getMessage());
        }
        return $bdd;
    }

    public function getName($id) {
        $database = $this->sql_connect();
        $sql = "SELECT pseudo FROM `clients` WHERE id=:id;";
        $statement = $database->prepare($sql);
        $statement->bindValue(':id', $id, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll()[0]["pseudo"];
    }

    public function getId($pseudo) {
        $database = $this->sql_connect();
        $sql = "SELECT id FROM `clients` WHERE pseudo=:pseudo;";
        $statement = $database->prepare($sql);
        $statement->bindValue(':pseudo', $pseudo);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC)[0]["id"];
    }
    
    function getPassword($id) {
        $database = sql_connect();
        $sql = "SELECT password FROM `clients` WHERE id=:id;";
        $statement = $database->prepare($sql);
        $statement->bindValue(':id', $id, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC)[0]["password"];
    }
    
    function getId($pseudo) {
        $database = sql_connect();
        $sql = "SELECT id FROM `clients` WHERE pseudo=:pseudo;";
        $statement = $database->prepare($sql);
        $statement->bindValue(':pseudo', $pseudo);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createUser($pseudo, $password) {
        $database = $this->sql_connect();
        $sql = "INSERT INTO `clients` (pseudo, password, date, permission) VALUES (:pseudo, :password, NOW(), :permission);";
        $statement = $database->prepare($sql);
        $statement->bindParam(':pseudo', $pseudo);
        $md5 = md5($password);
        $statement->bindParam(':password', $md5);
        $str = "utilisateur";
        $statement->bindParam(':permission', $str);
        try {
            $statement->execute();
        } catch (Exception $e) {
            return 0;
        }
        return 1;
    }
    
    public function checkLogin($pseudo, $password){
        $database = $this->sql_connect();
        $sql = "SELECT password FROM clients WHERE pseudo = :p;";
        $statement = $database->prepare($sql);
        $statement->bindParam(":p",$pseudo);
        $statement->execute();
        $count = $statement->rowCount();
        if ($count != 1) {
            return 0;
        }
        $check = $statement->fetchAll(PDO::FETCH_ASSOC);
        if ($check[0]["password"] == md5($password)){
            return $this->getId($pseudo);
        } else {
            return 0;
        }
    }
}    
?>

