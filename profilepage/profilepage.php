<?php
    include "../db/db_connect.php"; // Include your database connection script
    session_start();

    $sql = "SELECT * FROM student WHERE email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $_SESSION["email"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $profile = $result->fetch_assoc();
    echo json_encode($profile);
    $stmt->close();
    $conn->close();
