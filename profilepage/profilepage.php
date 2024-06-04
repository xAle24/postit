<?php
// TODO: check if this works

include "../db/db_connect.php"; // Include your database connection script
session_start();

// // Create a SQL query to fetch all resources
// $sql = "SELECT * FROM student WHERE email = ?"; // TODO: update query with user email
// $email = $_SESSION["email"];
// $stmt = $conn->prepare($sql);
// $stmt->bind_param("s", $email);
// $stmt->execute();
// $result = $stmt->get_result();
// $stmt->close();
// // echo $result->fetch_assoc();
// echo "<script>console.log(" . $result . ")</script>";

// // Encode the resources as a JSON string
// // $json = json_encode($result);

// // Output the JSON string
// // echo $json;

    // assuming you have a connection $conn
    $email = $_SESSION["email"];
    // prepare and bind
    $stmt = $conn->prepare("SELECT * FROM student WHERE email = ?");
    $stmt->bind_param("s", $email);

    // execute the query
    $stmt->execute();

    // bind the result
    $stmt->bind_result($image);

    // fetch the data
    $stmt->fetch();

    // close the statement
    $stmt->close();

    // echo the image url
    echo $image;
?>