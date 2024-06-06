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

    // Send comment back to client
    $sql = "SELECT 
            comment.content, 
            student.name, 
            student.surname,
            student.imagePath
            FROM 
                comment
            JOIN 
                student ON student.email = comment.email
            WHERE 
                comment.meetingID = ?
            ORDER BY 
                comment.timestamp DESC
            LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $_SESSION["postID"]);
    $stmt->execute();
    $answer = $stmt->get_result()->fetch_assoc();
    
    error_log("Sending back answer in addComment.php: " . print_r($answer, true) . "\n", 3, "error.log");
    echo json_encode($answer);

    $stmt->close();
