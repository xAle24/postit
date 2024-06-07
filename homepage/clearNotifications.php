<?php
    include '../db/db_connect.php';
    session_start();
    $sql = "DELETE FROM notification WHERE email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $_SESSION["email"]);
    $stmt->execute();
    
    error_log("Notifications cleared successfully!", 3, 'error.log');

    $stmt->close();
    $conn->close();
?>