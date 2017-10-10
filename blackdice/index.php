
<?php
	include('login.php');

	if(isset($_SESSION['login_user'])){
		header("location: profile.php");
	}

	if (isset($_POST['register'])) {
		header("location: register.php");
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
	    <link href="assets/css/login.css" rel="stylesheet">
		<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
	</head>

	<body>
	
		<div class="pageContainer">

			<div class= "logo">
				<img src="assets/img/headicon.png">
			</div>
			
			<div class="logo">
				<form action="" method="post">

					<input id="name" name="username" placeholder=" Username " type="text" class="writeBox">
					<input id="password" name="password" placeholder=" Password " type="password" class="writeBox">
					
					<br>

					<button id="sub" name="submit" class="myButtonBlue" type="submit"> ¡A jugar! </button>
					<button id="reg" name="register" class="myButtonBlue" type="submit"> ¿Hay sitio para uno más? </button>

					<br>

					<span><?php echo $error; ?></span>

				</form>
			</div>

		</div>

	</body>
</html>