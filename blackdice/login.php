<?php
	session_start(); // Starting Session

	$error=''; // Variable To Store Error Message

	if (isset($_POST['submit'])) {

		if (empty($_POST['username']) || empty($_POST['password'])) {
			$error = "Username or Password is invalid";
		}

		else {
			// Define $username and $password
			$username = $_POST['username'];
			$password = $_POST['password'];

			// Establishing Connection with Server by passing server_name, user_id and password as a parameter
			$connection = mysqli_connect("mysql.hostinger.es", "u269585299_black", "psicoP21", "u269585299_black");
		
			// SQL query to fetch information of registerd users and finds user match.
			$query = mysqli_query($connection, "SELECT * FROM Accounts_Login WHERE Password = '$password' AND Username = '$username'");
			$rows = mysqli_num_rows($query);
			
			if ($rows == 1) {
				$_SESSION['login_user'] = $username; // Initializing Session
				header("location: profile.php"); // Redirecting To Other Page
			} 

			else {
				$error = "Username or Password is invalid";
			}

			mysqli_close($connection); // Closing Connection
		}
	}
?>