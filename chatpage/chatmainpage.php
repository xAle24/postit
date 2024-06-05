<?php
    include '../db/db_connect.php';
    session_start();
    $sql = "SELECT student.name,student.email FROM student JOIN adds ON student.email = adds.second_stu_email WHERE adds.first_stu_email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $_SESSION["email"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $students = array();
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
    $stmt->close();
    $conn->close();
?>