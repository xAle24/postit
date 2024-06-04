<?php
    include "../db/db_connect.php"; // Include your database connection script
    session_start();

    $sql = "SELECT * FROM student WHERE email = 'alin@gmail.it'";
    $stmt = $conn->prepare($sql); 
    $stmt->execute();
    $result = $stmt->get_result();
    $profile = array();
    while ($row = $result->fetch_assoc()) {
        $profile[] = $row;
    }
    echo json_encode($profile);
    $stmt->close();
    $conn->close();
?>