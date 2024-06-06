<?php
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT 
        comment.content, 
        student.name, 
        student.surname
        FROM 
            comment
        JOIN 
            student ON student.email = comment.email
        WHERE 
            comment.meetingID = ?";

    $stmt = $conn->prepare($sql); 

    error_log("In file fetchComment.php, ready to bind postID: " . $_SESSION["postID"] . "\n", 3, "error.log");

    $stmt->bind_param("s", $_SESSION["postID"]);
    $stmt->execute();
    $temp = $stmt->get_result();
    $result = array();
    while ($row = $temp->fetch_assoc()) {
        $result[] = $row;
    }
        
    error_log("In file fetchComment.php, result: ". json_encode($result) . "\n", 3, "error.log");

    echo json_encode($result);
    $stmt->close();
    $conn->close();