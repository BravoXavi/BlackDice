
<?php

	session_start();

	if (isset($_POST['endRegister'])) {
		
			if ( $_POST['password'] != $_POST['rPassword'] && !empty($_POST['password']) && !empty($_POST['rPassword']) ) {
				$error = "The password is not equal in both fields!";
			}
			else {
				if ( empty($_POST['username']) || empty($_POST['password']) || empty($_POST['rPassword'])  ) {
					$error = "You need to fill every field!";
				}

				else {

					$username = $_POST['username'];
					$password = $_POST['password'];

					$connection = mysqli_connect("mysql.hostinger.es", "u269585299_black", "psicoP21", "u269585299_black");
					$query = mysqli_query($connection, "SELECT * FROM Accounts_Login WHERE Username = '$username'");
					$rows = mysqli_num_rows($query);

					if ($rows > 0) {
						$error = 'Username taken. Please, choose another.';
					} 

					else {
						$query = mysqli_query($connection, "INSERT INTO `u269585299_black`.`Accounts_Login` (`id`, `Username`, `Password`) VALUES (NULL, '$username', '$password');");

						$_SESSION['login_user'] = $username;

						mysql_close($connection);
						header("location: profile.php");
					}

				}
			}
			
	}

	if(isset($_POST['toLogin'])){
		header("location: index.php");
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
	    <link href="assets/css/register.css" rel="stylesheet">
		<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
	</head>

	<body>

		<div class="pageContainer">
			
			<div class="logo">
				<h2> Forma parte de BlackDice </h2>
				<h3> (¡Y empieza a jugar al momento!) </h3>
			</div>

			<br><br>

			<div class="logo">
				<form action="" method="post">

					<label>Nombre de usuario: </label>
					<input id="name" name="username" placeholder="username" type="text" class="writeBox">
					<label>Contraseña: </label>
					<input id="password" name="password" placeholder="**********" type="password" class="writeBox">
					<label>Repite tu contraseña: </label>
					<input id="rPassword" name="rPassword" placeholder="**********" type="password" class="writeBox">
					
					<br>

					<button id="sub" name="endRegister" class="myButtonBlue" type="submit"> ¡Hecho! </button>
					<button id="reg" name="toLogin" class="myButtonBlue" type="submit"> Volver al inicio </button>
					
					<br>

					<span><?php echo $error; ?></span>

				</form>
			</div>

		</div>

	</body>
</html>