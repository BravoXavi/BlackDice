
function moveRequest(){
	if(moveReq){
		var posX = getXPosition(mouseX);
		var posY = getYPosition(mouseY);

		var row = 1;
		var col = 1;

		if( posX > 0 ) row = (posX/32)+1;
		if( posY > 0 ) col = (posY/32)+1;

		if(swim == false && matrixMap[row][col] == 2){

			var message = "¡No sabes nadar, eso seria peligroso!";
			moveReq = false;
			message = message.bold().fontcolor("#AE0001");
			$("#chat").append("<p class='msg'>" + message +"</p>");
		}

		else if(climb == false && matrixMap[row][col] == 3){

			var message = "¡No sabes trepar, pasaria algo malo!";
			moveReq = false;
			message = message.bold().fontcolor("#AE0001");
			$("#chat").append("<p class='msg'>" + message +"</p>");
		}

		else if(matrixMap[row][col] == "" || matrixMap[row][col] == undefined || matrixMap[row][col] == null){
			var message = "Ehr... El GM agradecera que no hagas eso ...";
			moveReq = false;
			message = message.bold().fontcolor("#AE0001");
			$("#chat").append("<p class='msg'>" + message +"</p>");
		}

		else{
			var blockmove = false;
			for(var i = 0; i < characters.length; i++){
				if( characters[i].owner == userPHP ){

					var maxX = characters[i].data.x + (moveIndex * 32);
					var maxY = characters[i].data.y + (moveIndex * 32);
					var minX = characters[i].data.x - (moveIndex * 32);
					var minY = characters[i].data.y - (moveIndex * 32);

					if( posX > maxX || posX < minX || posY > maxY || posY < minY) blockmove = true;
					if( posX == maxX || posX == minX)	if(posY != characters[i].data.y ) blockmove = true;
					if( posY == maxY || posY == minY)	if(posX != characters[i].data.x ) blockmove = true;

				}
			}
			if(blockmove){
				var message = "¡¡No puedes moverte tan lejos!!";
				moveReq = false;
				message = message.bold().fontcolor("#AE0001");
				$("#chat").append("<p class='msg'>" + message +"</p>");		
			}
			else{
				
				var moveAux = [];

				for(var i = 0; i < moveReqData.length; i = i+4){
					if(moveReqData[i+3] == userPHP){}
					else{
						moveAux.push(moveReqData[i]);
						moveAux.push(moveReqData[i+1]);
						moveAux.push(moveReqData[i+2]);
						moveAux.push(moveReqData[i+3]);
					}
				}

				moveReqData = moveAux;

				moveReqData.push(posX); moveReqData.push(posY); moveReqData.push(userColor); moveReqData.push(userPHP);

				var message = "¡" + userPHP.toUpperCase() + " quiere desplazarse!";

				message = message.bold().fontcolor(userColor);

				$("#chat").append("<p class='msg'>" + message +"</p>");
				var chat = document.getElementById("chat");
		    	chat.scrollTop = chat.scrollHeight;
				server.sendMessage({type:"moveRequest", text: message, name: username, posX: posX, posY: posY, color: userColor, moveOwner: userPHP});

				moveReq = false;
			}	

		}

	}
}

function attackRequest(){
	if(attackReq){
		var posX = getXPosition(mouseX);

		var posY = getYPosition(mouseY);

		attackReqData.push(posX); attackReqData.push(posY); attackReqData.push(userColor);

		var message = "¡" + userPHP.toUpperCase() + " quiere atacar!";

		message = message.bold().fontcolor(userColor);

		$("#chat").append("<p class='msg'>" + message +"</p>");
		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
		server.sendMessage({type:"attackRequest", text: message, name: username, posX: posX, posY: posY, color: userColor});

		attackReq = false;
	}
}

function moveReqChecker(posX, posY, color, moveOwner){

	var auxmoving = [];

	for(var i = 0; i < moveReqData.length; i = i+4){
		if(moveOwner == moveReqData[i+3]){
		}
		else{
			auxmoving.push(moveReqData[i]);
			auxmoving.push(moveReqData[i+1]);
			auxmoving.push(moveReqData[i+2]);
			auxmoving.push(moveReqData[i+3]);
		}
	}

	moveReqData = auxmoving;

	moveReqData.push(posX);
	moveReqData.push(posY);
	moveReqData.push(color);
	moveReqData.push(moveOwner);
}

function attackReqChecker(posX, posY, color){
	console.log("Nueva señal de ataque");
	console.log(attackReqData);
	attackReqData.push(posX);
	attackReqData.push(posY);
	attackReqData.push(color);
	console.log("Queda...");
	console.log(attackReqData);
}

function throwDice(dice, number){

	if( isNumber(number) ){
		var nums = [];
		for( var i = 0; i < number; i++){
			nums.push( Math.floor( Math.random() * ( dice - 1 + 1 ) + 1) );
		}

		var message = "Lanzamiento de " + number.toString() + " dados de " + dice.toString() + " = ";

		for( var i = 0; i < nums.length; i++){
			if( i == 0 ) message = message + nums[i].toString();
			else message = message + ", " + nums[i].toString();
		} 

		message = message.bold().fontcolor('#BF052B');

		$("#chat").append("<p class='msg'>" + message +"</p>");

		server.sendMessage({type:"diceRoll", text: message, name: username});
	}

	else{
		var errmsg = "El numero de dados introducido es incorrecto.";
		errmsg = errmsg.bold().fontcolor("#AE0001");
		$("#chat").append("<p class='msg'>" + errmsg + "</p>");
	}

}

function isNumber(obj) { 
	return !isNaN(parseFloat(obj));
}