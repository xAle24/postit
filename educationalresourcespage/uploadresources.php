<?php

include "../db/db_connect.php";
session_start();

$target_dir = "../database-content/uploads/"; // Specify the directory where file is going to be placed

// Build an html page
echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\">
        <title>ServerResponse</title>
        <link rel=\"stylesheet\" href=\"../common/serverresponse.css\">
    </head>
    <body>
        <main>
            <button id=\"backBtn\" onclick=\"location.href='../homepage/homepage.html'\">Torna alla home</button>
            <div class=\"responseContainer\">
                <h2 id=\"responseTitle\">Risposta del server</h2>
                <hr>";
// TODO: it's better to use a link than a button to go back to the resources page

foreach ($_FILES as $key => $value) {
    // $value["name"] is an array, so we need to iterate over it
    for ($i = 0; $i < count($value["name"]); $i++) {
        $target_file_path = $target_dir . basename($value["name"][$i]); // Specify the path of the file to be uploaded

        // Check if file already exists
        if (file_exists($target_file_path)) {
            echo "Il file " . $value["name"][$i] . " esiste già. <br/>";
            continue; // Skip to the next file
        }

        // Attempt to move the uploaded file to your desired location
        if (move_uploaded_file($value["tmp_name"][$i], $target_file_path)) {
            $subject = $_POST["subject"]; // Assuming the subject is submitted via a form
            // echo "Found subject: " . $subject . "<br/>";
            $description = $_POST["description"]; // Assuming the description is submitted via a form
            // echo "Found description: " . $description . "<br/>";
            $subjectID = getSubjectUUID($subject, $conn); // Fetch the subjectID using the getSubjectUUID function
            $resourceUUID = uniqid(); // Generate a UUID for resourceID
            $file_type_code = getFileCode($value["type"][$i]);

            $sql = "INSERT INTO educational_resource (resourceID, resourceName, filePath, `type`, email, subjectID) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            //echo $stmt->field_count . "<br/>";
            $stmt->bind_param("sssiss", $resourceUUID, $value["name"][$i], $target_file_path, $file_type_code, $_SESSION["email"], $subjectID);
            $stmt->execute();
            $stmt->close();
            echo "Il file " . $value["name"][$i] . " è stato caricato. <br/>";
        } else {
            echo "Si è verificato un errore nel caricamento del file " . $value["name"][$i] . "<br/>";
        }
    }
}

echo "      <hr>
            <button id=\"backToResourcesBtn\" onclick=\"location.href='educationalresourcespage.html'\">Torna alla pagina dei materiali</button>
        </div>
    </main>
</html>";

$conn->close();

function getSubjectUUID($subject, $conn) {
    $sql = "SELECT subjectID FROM `subject` WHERE `name` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $subject);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->fetch_assoc()["subjectID"];
}

/**
 * Takes a file mime type and returns a code that represents the type of the file.
 * 0: pdf
 * 1: image
 * 2: video
 * 3: audio
 * 4: other
 */
function getFileCode($fileType) {
    error_log("File type: " . $fileType . "\n", 3, "error.log");
    if (strpos($fileType, "pdf") !== false) {
        return 0;
    } else if (strpos($fileType, "image") !== false) {
        return 1;
    } else if (strpos($fileType, "video") !== false) {
        return 2;
    } else if (strpos($fileType, "audio") !== false) {
        return 3;
    } else {
        return 4;
    }
}

// NOT NEEDED

/**
 * Create a new subject in the database.
 * $subject: the name of the subject
 * $cfu: the number of CFUs of the subject
 * $conn: the connection to the database
 */
/* function createSubject($subject, $cfu, $conn) {
    $sql = "INSERT INTO subject (subjectID, name, CFU) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $subjectID = uniqid(); // Generate a UUID for subjectID
    $stmt->bind_param("ssi", $subjectID, $subject, $cfu);
    $stmt->execute();
    $stmt->close();
} 

function doesSubjectExist($subject, $conn) {
    $sql = "SELECT * FROM subject WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $subject);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->num_rows > 0;
} */
