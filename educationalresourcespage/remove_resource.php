<?php
include '../db/db_connect.php';
session_start();

// Get the resource file path from the request
$resourceFilePath = $_POST['resourceFilePath'];
$resourceName = $_POST['resourceName'];

// Check if the file exists
if (file_exists($resourceFilePath)) {
    // Remove the resource file
    if (unlink($resourceFilePath)) {
        updateDatabase($resourceName, $conn);
        echo "Resource removed successfully.";
    } else {
        echo "Failed to remove the resource.";
    }
} else {
    echo "Resource file not found.";
}

function updateDatabase($removedResourceName, $conn) {
    $sql = "DELETE FROM educational_resource WHERE resourceName = '$removedResourceName'";
    if ($conn->query($sql) === TRUE) {
        echo "Database updated successfully.";
    } else {
        echo "Error updating database: " . $conn->error;
    }
}