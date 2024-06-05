<?php
    include '../db/db_connect.php';
    session_start();
    $toFollow = $_GET['email'];
    $sql = "INSERT INTO groups(name, email) VALUES (?,?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $_SESSION["email"]);
    $stmt->execute();
    $result = $stmt->get_result();
    echo "Success";
    $stmt->close();
    $conn->close();
?>