<?php
    include '../db/db_connect.php';
    session_start();

    $sql = "INSERT INTO `availability`(`email`, `meetingID`) VALUES (?,?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss",$_SESSION["email"], $_SESSION["postID"]);
    if ($stmt->execute() === FALSE && $conn->errno === 1062) {
        // Handle duplicate entry error
        error_log("Duplicate entry in updateAvailability.php (the checkbox): " . $conn->error . "\n", 3, "error.log");
    } else {
        // Handle other errors or success
        echo "Record inserted successfully";
    }
    $stmt->close();
    $conn->close();