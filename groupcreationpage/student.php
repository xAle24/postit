<?php
    include '../db/db_connect.php';
    session_start();
    $sql = "SELECT student.name,student.email FROM student JOIN is_in ON student.email = is_in.email WHERE is_in.groupID = ?";
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