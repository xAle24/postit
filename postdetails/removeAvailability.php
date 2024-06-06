<?php
    include '../db/db_connect.php';
    session_start();

    $sql = "DELETE FROM `availability` WHERE email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s",$_SESSION["email"]);
    $stmt->execute();
    $stmt->close();
    $conn->close();