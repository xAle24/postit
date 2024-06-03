<?php
    include '../db/db_connect.php';
    session_start();
    $search = $_POST["search"];
    $sql = "SELECT name FROM student WHERE name LIKE ?";
    //$stmt = $pdo->prepare($sql);
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $search);
    $stmt->execute();
    $result = $stmt->get_result();
    $students = array();
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
?>