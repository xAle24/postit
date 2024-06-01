<?php
    include '../db/db_connect.php';
    session_start();

    $email = $_GET['email'];
    $password = $_GET['password'];
    
    $sql = "SELECT * FROM student WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION["name"] = $row["name"];
        $_SESSION["surname"] = $row["surname"];
        $_SESSION["birthdate"] = $row["birthdate"];
        $_SESSION["email"] = $row["email"];
        echo "Success";
    } else {
        echo "Email or password wrong";
    }
    $stmt->close();
    $conn->close();
?>    