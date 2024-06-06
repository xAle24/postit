<?php
include "../db/db_connect.php";
session_start();

error_log("Content of \$_POST: " . print_r($_POST, true) . "\n", 3, "error2.log");

$groupName = $_POST["groupName"];

createGroup($groupName, $conn);

$conn->close();

/* Functions */

function createGroup($groupName, $conn) {
    $sql = "INSERT INTO groups (`groupID`, `name`, `email`) VALUES (UUID(), ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        error_log("SQL statement of post creation failed to prepare: " . mysqli_error($conn) . "\n", 3, "error.log");
        exit();
    }

    error_log("Values to bind: group name = " . $groupName . ", \n email =" . $_SESSION["email"] . "\n", 3, "error.log");

    mysqli_stmt_bind_param($stmt, "ss", $groupName, $_SESSION["email"]);
    if (!mysqli_stmt_execute($stmt)) {
        error_log("Error in statement execution during post creation: ". mysqli_error($conn) . "\n", 3, "error.log");
    };
    mysqli_stmt_close($stmt);
}

?>
