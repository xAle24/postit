<?php
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT * FROM student WHERE student.email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $_SESSION["recipientEmail"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $student = $result->fetch_assoc();
    echo json_encode($student);
    $stmt->close();
    $conn->close();
?>
