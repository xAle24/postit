<?php
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT * FROM `message` WHERE (Sen_email = ? AND rec_email = ?) OR (Sen_email = ? AND rec_email = ?) ORDER BY timestamp";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ssss", $_SESSION["email"], $_SESSION["recipientEmail"], $_SESSION["recipientEmail"], $_SESSION["email"],);
    $stmt->execute();
    $result = $stmt->get_result();
    $messages = array();
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode($messages);
    $stmt->close();
    $conn->close();
?>