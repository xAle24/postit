<?php
include "../db/db_connect.php";
session_start();

error_log("Content of \$_POST: " . print_r($_POST, true) . "\n", 3, "error.log");

$postTitle = $_POST["postTitle"];
$postDescription = $_POST["postDescription"];
$availabilityDates = $_POST["availabilityDate"]; // array
$startTimes = $_POST["startTime"]; // array
$endTimes = $_POST["endTime"]; // array
$numberOfPostsToCreate = count($availabilityDates);
$postLocation = $_POST["postLocation"];
$locationStreet = $_POST["locationStreet"];
$streetNumber = $_POST["streetNumber"];
$locationCity = $_POST["locationCity"];
$locationPostalCode = $_POST["locationPostalCode"];
// The meeting type is an integer, 0 for study meeting, 1 for hangout.
// In case of error, returns -1.
$meetingType = mapMeetingType($_POST["meeting-type"]);

// If the meeting is a hangout, there's no subject specified.
$subject = isset($_POST["subject"]) ? $_POST["subject"] : null;
$subjectID = null;
if ($subject !== null) {
    $subjectID = getSubjectUUID($subject, $conn);
}

error_log("Subject UUID: " . $subjectID . "\n", 3, "error.log");

// First, I need to create the location if it doesn't exist.
if (!doesLocationExist($postLocation, $conn)) {
    createLocation($postLocation, $locationStreet, $streetNumber, $locationCity, $locationPostalCode, $conn);
}

// Now I need the location identifier.
$locationIdentifier = getLocationUUID($postLocation, $conn);
error_log("Location identifier: " . $locationIdentifier . "\n", 3, "error.log");

// Creating as many posts as the availabilities are.
for ($i = 0; $i < $numberOfPostsToCreate; $i++) {
    $availabilityDate = $availabilityDates[$i];
    createPost($postTitle, 
               $postDescription, 
               $availabilityDates[$i], 
               $startTimes[$i],
               $endTimes[$i],
               $meetingType, 
               $locationIdentifier, 
               $subjectID, 
               $conn);
}

error_log("Operation completed!", 3, "error.log");
$conn->close();

/* Functions */

function createLocation($postLocation, $locationStreet, $streetNumber, $locationCity, $locationPostalCode, $conn) {
    $sql = "INSERT INTO location (locationID, name, street, streetNumber, city, cap) VALUES (UUID(), ?, ?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        error_log("SQL statement to create location failed to prepare: " . mysqli_error($conn) . "\n", 3, "error.log");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "sssss", $postLocation, $locationStreet, $streetNumber, $locationCity, $locationPostalCode);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}

function doesLocationExist($postLocation, $conn) {
    $sql = "SELECT * FROM `location` WHERE `name` = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        error_log("SQL statement to see if location exists failed to prepare: " . mysqli_error($conn) . "\n", 3, "error.log");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $postLocation);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_num_rows($result) > 0;
}

function getLocationUUID($postLocation, $conn) {
    $sql = "SELECT `locationID` FROM `location` WHERE `name` = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        error_log("SQL statement to fetch location uuid failed to prepare: " . mysqli_error($conn) . "\n", 3, "error.log");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $postLocation);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_assoc($result)["locationID"];
}

function getSubjectUUID($subjectName, $conn) {
    $sql = "SELECT `subjectID` FROM `subject` WHERE `name` = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        error_log("SQL statement to fetch subject uuid failed to prepare: " . mysqli_error($conn) . "\n", 3, "error.log");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $subjectName);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_assoc($result)["subjectID"];
}

function createPost($postTitle, $postDescription, $availabilityDate, $startTime, 
$endTime, $meetingType, $locationIdentifier, $subjectID, $conn) {
    $sql = "INSERT INTO meeting (`meetingID`, `title`, `content`, `appointment`, `startTime`, `endTime`, `type`, `timestamp`, `email`, `locationID`, `subjectID`) VALUES (UUID(), ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        error_log("SQL statement of post creation failed to prepare: " . mysqli_error($conn) . "\n", 3, "error.log");
        exit();
    }

    error_log("Values to bind: post title = " . $postTitle . ", \n post description =" 
    . $postDescription . ", \n availability date =" 
    . $availabilityDate . ", \n start time =" 
    . $startTime . ", \n end time =" 
    . $endTime . ", \n meeting type =" 
    . $meetingType . ", \n email =" 
    . $_SESSION["email"] . ", \n location identifier =" 
    . $locationIdentifier . ", \n subject ID =" 
    . $subjectID === null ? "null" : $subjectID . "\n", 
    3, "error.log.log");

    mysqli_stmt_bind_param($stmt, "sssssisss", $postTitle, $postDescription, 
    $availabilityDate, $startTime, $endTime, $meetingType, $_SESSION["email"], $locationIdentifier, $subjectID);
    if (!mysqli_stmt_execute($stmt)) {
        error_log("Error in statement execution during post creation: ". mysqli_error($conn) . "\n", 3, "");
    };
    mysqli_stmt_close($stmt);
}

function mapMeetingType($meetingType) {
    switch ($meetingType) {
        case "study-meeting":
            return 0;
        case "hangout":
            return 1;
        default:
            return -1;
    }
}
