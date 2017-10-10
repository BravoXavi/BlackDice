<?php
	// Establishing Connection with Server by passing server_name, user_id and password as a parameter
	$connection = mysqli_connect("mysql.hostinger.es", "u269585299_black", "psicoP21", "u269585299_black");

	// Session Start
	session_start();

	// Storing Session
	$user_check = $_SESSION['login_user'];

	// SQL Query To Fetch Complete Information Of User
	$ses_sql = mysqli_query($connection, "SELECT Username FROM Accounts_Login WHERE Username = '$user_check'");

	$row = mysqli_fetch_array($ses_sql, MYSQLI_ASSOC);

	$login_session = $row['Username'];

	if(!isset($_SESSION['login_user'])){

	    // Closing Connection
		mysqli_close($connection);

		// Redirecting To Home Page
		header('Location: index.php'); 
	}
?>