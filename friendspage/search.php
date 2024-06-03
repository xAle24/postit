<?php
    include '../db/db_connect.php';
    session_start();
    $search = $_POST["search"];
    $sql = "SELECT student.email,student.name 
        FROM student WHERE name LIKE ? AND email NOT IN (
        SELECT adds.second_stu_email 
        FROM adds
        WHERE first_stu_email = ?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $search, $_SESSION['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    $students = array();
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
?>