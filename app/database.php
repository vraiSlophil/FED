<?php

class Database {
    function sql_connect(){
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

}    
?>

