<?php
    include '../db/db_connect.php';
    session_start();

    $dest=$_POST["email"];
    $_SESSION["recipientEmail"] = $dest; //email del destinatario
?>