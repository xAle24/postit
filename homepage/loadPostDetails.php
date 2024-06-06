<?php
include '../db/db_connect.php';
session_start();

$selectedPost = $_POST["postID"];
$_SESSION["postID"] = $selectedPost; // the post the user wants to see the details of

