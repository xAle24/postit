<?php
    date_default_timezone_set('Europe/Rome');
    include '../db/db_connect.php';
    session_start();
    $text = $_POST["text"];
    error_log("text: " . $text);
    error_log("recipientEmail: " . $_SESSION["recipientEmail"] . "\n", 3, "error.log");
    error_log("email: " . $_SESSION["email"] . "\n", 3, "error.log");
    $sql = "INSERT INTO `message`(`messageID`, `content`, `timestamp`, `rec_email`, `Sen_email`, `groupID`) 
        VALUES (UUID(),?,?,?,?,null)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ssss",$text,date('Y-m-d H:i:s'),$_SESSION["recipientEmail"], $_SESSION["email"]);
    $stmt->execute();
    $stmt->close();
    $conn->close();
?>