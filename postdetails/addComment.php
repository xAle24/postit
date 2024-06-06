<?php
    include '../db/db_connect.php';
    session_start();
    $content = $_POST['content'];

    error_log('content: ' . $content . '\n', 3, 'error.log');

    $sql = "INSERT INTO `comment`(`commentID`, `content`, `meetingID`, `email`, `timestamp`) VALUES (UUID(), ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("sss", $content,  $_SESSION["postID"], $_SESSION["email"]);
    $stmt->execute();
    $stmt->close();
    $conn->close();