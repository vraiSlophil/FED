<?php
    function dbConnect(){
        include "database_info.php";

        $conn = mysqli_connect($hostname, $username, $password, $database) or die("Database connection failed");

        return $conn;
    }

    $conn = dbConnect();

    function verifyEmail($email): bool {
        $conn = dbConnect();
        $sql = "SELECT email FROM users WHERE email='$email'";
        $result = mysqli_query($conn, $sql);
        $count = mysqli_num_rows($result);
        if ($count > 0) {
            return true;
        }
        return false;
    }

    function verifyNickname($nickname): bool {
        $conn = dbConnect();
        $sql = "SELECT nickname FROM users WHERE nickname='$nickname'";
        $result = mysqli_query($conn, $sql);
        $count = mysqli_num_rows($result);
        if ($count > 0) {
            return true;
        }
        return false;
    }

    function createUser($email, $password, $nickname, $uuid) {
        $conn = dbConnect();
        $sql = "INSERT INTO users (email, password, nickname, uuid) VALUES ('$email', '$password', '$nickname', '$uuid')";
        $result = mysqli_query($conn, $sql);
        return $count;
    }

    function checkLogin($nickname, $password): bool {
        $conn = dbConnect();
        $sql = "SELECT nickname FROM users WHERE nickname='$nickname' AND password='$password'";
        $result = mysqli_query($conn, $sql);
        $count = mysqli_num_rows($result);
        if ($count > 0) {
            return true;
        }
        return false;
    }

    function getUuid($nickname){
        $conn = dbConnect();
        $sql = "SELECT uuid FROM users WHERE nickname='$nickname'";
        $result = mysqli_query($conn, $sql);
        $count = mysqli_num_rows($result);
        $row = mysqli_fetch_array($result);
        if ($count > 0) {
            return $row["uuid"];
        }
        return false;
    }

    function getEmail($nickname){
        $conn = dbConnect();
        $sql = "SELECT email FROM users WHERE nickname='$nickname'";
        $result = mysqli_query($conn, $sql);
        $count = mysqli_num_rows($result);
        $row = mysqli_fetch_array($result);
        if ($count > 0) {
            return $row["email"];
        }
        return false;
    }

    function getPassword($nickname) {
        $conn = dbConnect();
        $sql = "SELECT password FROM users WHERE nickname='$nickname'";
        $result = mysqli_query($conn, $sql);
        $count = mysqli_num_rows($result);
        $row = mysqli_fetch_array($result);
        if ($count > 0) {
            return $row["password"];
        }
        return false;
    }

    function setPassword($nickname, $password) {
        $pass = md5($password);
        $conn = dbConnect();
        $sql = "UPDATE users SET password='$password' WHERE nickname='$nickname'";
        $result = mysqli_query($conn, $sql);
        return $count;
    }

    function setNickname($nickname, $uuid) {
        $conn = dbConnect();
        $sql = "UPDATE users SET nickname='$nickname' WHERE uuid='$uuid'";
        $result = mysqli_query($conn, $sql);
        return $count;
    }

    function setEmail($nickname, $email) {
        $conn = dbConnect();
        $sql = "UPDATE users SET email='$email' WHERE nickname='$nickname'";
        $result = mysqli_query($conn, $sql);
        return $count;
    }
?> 