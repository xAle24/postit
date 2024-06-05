<?php
include "../db/db_connect.php"; // Include your database connection script
session_start();

$target_dir = "../database-content/profile-image/"; // Specify the directory where file is going to be placed

error_log("_FILES content: " . print_r($_FILES, true) . "<br/>");

$file_name = $_FILES["imageToUpload"]["name"];

$target_file_path = $target_dir . basename($file_name); // Specify the path of the file to be uploaded

error_log("File path: " . $target_file_path . "<br/>");

createInitialHtml();

// Check if file already exists
if (file_exists($target_file_path)) {
    echo "Il file " . $file_name . " esiste già. <br/>";
    createFinalHtml();
    return;
}

// Attempt to move the uploaded file to your desired location
/* When an image is uploaded, the event listener attached to the
#imageInput input is triggered because a change has occurred. The listener
calls a function that automatically submits the form, which triggers
the action attribute specified in the form tag. The action
automatically uploads the submitted file to the php environment.
However, the REAL binary data of the file are stored in a temporary
folder, called tmp and visible in the Xampp/php/ folder.
That's why the file needs to be moved from there to the target
folder, and this is done by accessing

    $_FILES["imageToUpload"]["tmp_name"]

*/
if (move_uploaded_file($_FILES["imageToUpload"]["tmp_name"], $target_file_path)) {
    removeOldImage(getOldFilePathIfPresent($conn));
    $sql = "UPDATE student SET imagePath = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $target_file_path, $_SESSION["email"]);
    $stmt->execute();
    $stmt->close();

    echo "Immagine caricata con successo. <br/>";
} else {
    echo "Si è verificato un errore nel caricamento dell'immagine. <br/>";
}
createFinalHtml();

$conn->close();

function createInitialHtml()
{
    // Build an html page
    echo
    "
    <!DOCTYPE html>
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
                <hr>
    ";
}

function createFinalHtml()
{
    echo
    "
    <hr>
            <button id=\"backToResourcesBtn\" onclick=\"location.href='profilepage.html'\">Torna alla pagina del profilo</button>
        </div>
    </main>
    ";
}

function getOldFilePathIfPresent($conn) {
    $oldFilePath = "";
    $sql = "SELECT imagePath FROM student WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $_SESSION["email"]);
    $stmt->execute();
    $stmt->bind_result($oldFilePath);
    $stmt->fetch();
    $stmt->close();

    return $oldFilePath;
}

function removeOldImage($oldFilePath) {
    if ($oldFilePath != "") {
        unlink($oldFilePath);
    }
}

?>