<?php
    include '../db/db_connect.php';
    session_start();
    $toRemove = $_GET['email'];
    $sql = "DELETE FROM groups WHERE groups.email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $_SESSION["email"], $toRemove);
    $stmt->execute();
    $result = $stmt->get_result();
    echo "Success";
    $stmt->close();
    $conn->close();
?>