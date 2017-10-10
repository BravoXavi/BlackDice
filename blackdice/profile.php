<?php
	//include('session.php');
	session_start();

	if( !defined('CHECK_ROOMS') ){

	    $username = $_SESSION['login_user'];
		$connection = mysqli_connect("mysql.hostinger.es", "u269585299_black", "psicoP21", "u269585299_black");
		$query = mysqli_query($connection, "SELECT * FROM Rooms WHERE Owner = '$username';");
		$numrows = mysqli_num_rows($query);	

	    define('CHECK_ROOMS', TRUE);
	}


	if (isset($_POST['newroom'])) {

		//CLAVE PRIMARIA: AUTOR + NOMBRE SALA

		if( empty($_POST['roomname'] ) ){
			$error1 = "You must specify a room name!";
		}
		else{

			$roomName = $_POST['roomname'];
			$checkExistingRoom = mysqli_query($connection, "SELECT Author, Room_Name FROM Rooms WHERE Author = '$username' AND Room_Name = '$roomName';");
			$numrows = mysqli_num_rows($checkExistingRoom);

			if($numrows != 0){
				$error1 = "You already have a room with that name!";
			}
			else{
				$characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
				$string = '';

				for ($i = 0; $i < 15; $i++) {
					$string .= $characters[rand(0, strlen($characters) - 1)];
				}

				
				$addRoom = mysqli_query($connection, "INSERT INTO `u269585299_black`.`Rooms` (`Author`, `Owner`, `Room_Name`, `Room_Status`, `Room_Code`) VALUES ('$username', '$username', '$roomName', 'Master', '$string');");
				header("Refresh:0");
			}
		}

	}

	if (isset($_POST['joinroom'])) {

		if( empty($_POST['roomcode'] ) ){
			$error2 = "You must specify a room code!";
		}
		else{

			$roomCode = $_POST['roomcode'];
			$checkRoom = mysqli_query($connection, "SELECT Room_Code FROM Rooms WHERE Room_Code = '$roomCode';");
			$checkExists = mysqli_query($connection, "SELECT * FROM Rooms WHERE Owner = '$username' AND Room_Code = '$roomCode';");
			$numrows = mysqli_num_rows($checkRoom);	
			$numrows2 = mysqli_num_rows($checkExists);

			if($numrows2 == 1){
				$error2 = "The room already exists!";
			}
			else{
				if($numrows == 0){
					$error2 = "The code doesn't exist!";
				}
				else{

					$chooseRoom = mysqli_query($connection, "SELECT * FROM Rooms WHERE Room_Code = '$roomCode';");
					$roomInfo = mysqli_fetch_row($chooseRoom);

					$author = $roomInfo[0];
					$roomName = $roomInfo[2];

					$username = $_SESSION['login_user'];

					$addRoom = mysqli_query($connection, "INSERT INTO `u269585299_black`.`Rooms` (`Author`, `Owner`, `Room_Name`, `Room_Status`, `Room_Code`) VALUES ('$author', '$username', '$roomName', 'Player', '$roomCode');");

					header("Refresh:0");
				}
			}
		}

	}
?>


<!DOCTYPE html>
<html>

	<head>
	  	<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	    <meta name="description" content="Main application">
	    <meta name="author" content="Xavier Bravo Guillen - TFG2016 - Universitat Pompeu Fabra">
	    <link rel="shortcut icon" href="assets/img/headicon.png">

		<title>BlackDice</title>

    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	    <link href="assets/css/profile.css" rel="stylesheet">
		<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
	</head>

	<body>

		<nav class="navbar navbar-inverse">
	        <div class="container-fluid">
	          <div class="navbar-header" style= "margin-right: 3%">
	            <a href="profile.php"><img src="assets/img/blackdicelogo.png" style="margin-top: 4%"></a>
	          </div>
	          <div class="welcome">
	          	<b class="myButtonRed" id="logout"><a href="logout.php">Log Out</a></b>
	          	<b class="connected">Conectado: <?php echo strtoupper($_SESSION['login_user']); ?></b>
	          </div>
	        </div>
	    </nav>


		<div class="pageContainer">

			<div class="rooms">

				<?php

					if($numrows > 0){
						while ($row = mysqli_fetch_row($query)) {
							echo "<div class='roomDiv'>";
							echo "<b>Nombre de sala: </b>" . str_repeat('&nbsp;', 6) . $row[2] . '<br>';
							echo "<b>Narrador de la sala: </b>" . str_repeat('&nbsp;', 5) . $row[0] . '<br>';
							echo "<b>Tu estado: </b>" . str_repeat('&nbsp;', 7) .$row[3] . '<br>';
							if ($row[3] == 'Master'){
								echo "<b>Codigo de sala: </b>" . str_repeat('&nbsp;', 7) . $row[4] . '<br>';
							}
							echo "<br><b><a href='app.php?rnam=$row[2]&unam=$username&s=$row[3]'> ¡Unirse! </a></b><br>";
							echo "<b><a href='delete.php?id=$row[5]'> Eliminar sala </a><br></b>";
							echo "</div>";
				    	}
				    }

		    	?>
		    	
			</div>
		
			<div class="joinZone">

				<div class="joinDiv">
					<form action="" method="post">
						<input id="roomname" name="roomname" placeholder="Nombre de sala" class="writeBox" type="text">
						<input id="sub" name="newroom" type="submit" class="myButtonBlue" value=" Crea una nueva sala " >
						<span><?php echo $error1; ?></span>
					</form>
					<br>
					<form action="" method="post">
						<input id="roomcode" name="roomcode" placeholder="Codigo de sala" class="writeBox" type="text">
						<input id="reg" name="joinroom" type="submit" class="myButtonBlue" value=" Unete a una sala existente ">
						<span><?php echo $error2; ?></span>
					</form>
				</div>

			</div>

		</div>

	</body>

    <script src="src/js/menuFunctions.js"></script>

</html>