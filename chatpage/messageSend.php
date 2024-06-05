<?php
    date_default_timezone_set('Europe/Rome');
    include '../db/db_connect.php';
    session_start();
    $text = $_POST["text"];
    error_log("text" . $text);
    $sql = "INSERT INTO `message`(`messageID`, `content`, `timestamp`, `rec_email`, `Sen_email`, `groupID`) 
        VALUES (UUID(),?,?,?,?,null)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ssss",$text,date('Y-m-d H:i:s'),$_SESSION["recipientEmail"], $_SESSION["email"]);
    $stmt->execute();
    $stmt->close();
    $conn->close();
?>