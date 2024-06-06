<?php
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT 
        meeting.meetingID, 
        COUNT(availability.email) AS people_joined
        FROM 
            meeting
        LEFT JOIN 
            availability ON meeting.meetingID = availability.meetingID
        WHERE 
            meeting.meetingID = ?";

    $stmt = $conn->prepare($sql); 

    error_log("In file fetchComment.php, ready to bind postID: " . $_SESSION["postID"] . "\n", 3, "error.log");

    $stmt->bind_param("s", $_SESSION["postID"]);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    
    error_log("In file fetchComment.php, result: ". json_encode($result) . "\n", 3, "error.log");

    echo json_encode($result);
    $stmt->close();
    $conn->close();