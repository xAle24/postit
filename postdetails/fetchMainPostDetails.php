<?php
    /**
     * This file fetches the main post details, visible at the top of the page:
     * - title
     * - author name and surname
     * - author profile image
     */
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT meeting.title, student.name, student.surname, student.imagePath, meeting.appointment, meeting.startTime, meeting.endTime
            FROM 
                meeting
            JOIN 
                student ON student.email = meeting.email
            WHERE 
                meeting.meetingID = ?";
    $stmt = $conn->prepare($sql); 

    error_log("In file fetchMainPostDetails.php, ready to bind postID: ".$_SESSION["postID"] . "\n", 3, "error.log");

    $stmt->bind_param("s", $_SESSION["postID"]);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    
    error_log("In file fetchMainPostDetails.php, result: ". json_encode($result) . "\n", 3, "error.log");

    echo json_encode($result);
    $stmt->close();
    $conn->close();
