<?php

/**
 * This file allows to fetch all the relevant data to create the post details page.
 * It is called when the user clicks on a post in the homepage.
 * It saves the postID in the session variable to be used in the post details page.
 */

include '../db/db_connect.php';
session_start();

$selectedPost = $_POST["postID"];
$_SESSION["postID"] = $selectedPost; // the post the user wants to see the details of

