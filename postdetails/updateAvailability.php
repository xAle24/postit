<?php
    include '../db/db_connect.php';
    session_start();

    $sql = "INSERT INTO `availability`(`email`, `meetingID`) VALUES (?,?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss",$_SESSION["email"], $_SESSION["postID"]);
    $stmt->execute();
    $stmt->close();
    $conn->close();