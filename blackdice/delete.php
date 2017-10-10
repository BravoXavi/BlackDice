<?php

	$idToDelete = $_GET["id"];
	$connection = mysqli_connect("mysql.hostinger.es", "u269585299_black", "psicoP21", "u269585299_black");
	$deleteQuery = mysqli_query($connection, "DELETE FROM `u269585299_black`.`Rooms` WHERE `Rooms`.`ID` = $idToDelete;");
	header("location: profile.php");
?>