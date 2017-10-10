
//connect to the server

var server;
var audioChat;
var room_name;
var username;
var resolution;
var connectedUsers = [];

server = new SillyClient();
audioChat = document.getElementById("audioCh");
room_name = roomPHP; //ESTA VARIABLE PROVIENE DE APP.PHP
server.connect( "93.104.209.19:55000", room_name );
username = userPHP; //ESTA VARIABLE PROVIENE DE APP.PHP
resolution = window.screen.availWidth;


//CUANDO TE CONECTAS AL SERVIDOR...
server.on_connect = function(){

    //Array usado para pintar
    var liner = new Array();
    
    //MENSAJE PREDEFINIDO EN EL CHAT
    $("#chat").append("<p class='msg'> (Utiliza el comando '/h' para recibir ayuda sobre los demas comandos existentes) </p>");
    $("#chat").append("<p class='msg'> <b>¡Buena suerte, aventureros!</b> </p>");

    //NOTIFICAMOS A LOS OTROS USUARIOS QUE NOS HEMOS CONECTADO	
	server.sendMessage(
		{
			type:"user", 
			text: " se ha conectado.", 
			name: username
		}
	);

	server.sendMessage({type:"newConn", name: username});

	server.loadData(room_name+'tiles'+tileLevel, function(data) { 
		if(data != undefined) matrixMap = JSON.parse(data);
	});

	server.loadData(room_name+'chars', function(data) {

		if(masterMode) controller2 = true;

		if(data != undefined && !masterMode){
			charactersToCreate = JSON.parse(data);
		}

		else if(data != undefined && masterMode){
			charactersToCreate = JSON.parse(data);
			controller2 = true;
			for(var i = 0; i < characters.length; i++){
				characters[i].data.update();
			}

			if(charactersToCreate.length != 0){

				characters = [];

				for(var i = 0; i < charactersToCreate.length; i++){
					var newChar;
					newChar = new DragImage(charactersToCreate[i].src, charactersToCreate[i].data.x, charactersToCreate[i].data.y);
					characters.push({data: newChar, src: charactersToCreate[i].src, owner: charactersToCreate[i].owner});
	  			}

	  			charactersToCreate = [];
			}
		}

	});

	server.loadData(room_name+"location", function(data) { 
		if(data != undefined) document.getElementById("location").value = data;
	});

	server.loadData(room_name+"time", function(data) { 
		if(data != undefined) document.getElementById("myTime").value = data;

		var x = document.getElementById("myTime").value;

		var hourString = x.substr(0, x.indexOf(':'));

		hour = parseInt(hourString);

		if(hour == 21 || hour == 22 || hour == 23 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5 || hour == 6){
			dayNight = 1;
			document.getElementById("daylight").src = "assets/img/moon.png";
		}
		else{
			dayNight = 0;
			document.getElementById("daylight").src = "assets/img/sun.png";
		}

	});

	server.loadData(room_name+'classes', function(data){
		if(data != undefined){
			personalClasses = data.split(',');
		}

		for( var i = 0; i < personalClasses.length; i++){
			insertNewClass(personalClasses[i]);
		}
	});

	server.loadData(room_name+'skills', function(data){
		if(data != undefined){
			personalSkills = data.split(',');
		}

		for( var i = 0; i < personalSkills.length; i++){
			insertNewSkill(personalSkills[i]);
		}


		server.loadData(room_name+username, function(data) {
			if(data != undefined){
				var array = data.split(',');
				document.getElementById("pjName").value = array[0];
				document.getElementById("pjHP").value = array[1];
				document.getElementById("pjMANA"). value = array[2];

				switch(array[3]){
					case '1': moveIndex = 6; break;
					default: moveIndex = 4; break;
				}

				for( var j = 4; j < array.length; j++){
					if(array[j] == 'true') document.getElementById("s"+(j-3).toString()).checked = true;
					else document.getElementById("s"+(j-3).toString()).checked = false;
				}

			}
		});

	});

};

//GESTOR DE MENSAJES DE OTROS USUARIOS (author_id es un identificador unico)
server.on_message = function( author_id, msg ){

	var chat = $("#chat")[0];

	var data = JSON.parse(msg);

	$("#data-sent").html( server.info_received );

	if(data.type == "chat")
	{
		if(chat.childNodes.length > 200)	$(chat.childNodes[0]).remove();

		$(chat).append("<p class='msg'>" + data.name.toUpperCase().fontcolor(data.color).bold() + ": " + data.text + "</p>");
		
		audioChat.play();
		
		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	else if(data.type == "chatgm"){
		if(chat.childNodes.length > 200)	$(chat.childNodes[0]).remove();

		$(chat).append("<p class='msg'>" + data.name.toUpperCase().fontcolor(data.color).bold() + " (GM): " + data.text + "</p>");
		
		audioChat.play();
		
		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	else if(data.type == "hour"){

		showHour( data.time );
	}

	else if(data.type == "city"){

		showCity( data.locat );
	}

	else if(data.type == "addedchar"){
		personalChars = data.array;
	}

	else if(data.type == "addedTile"){
		recoverTiles(data.name, data.src);
	}

	else if(data.type == "actionM"){
		if(chat.childNodes.length > 200)	$(chat.childNodes[0]).remove();

		$(chat).append("<p class='msg'>" + data.text + "</p>");
		
		audioChat.play();
		
		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	else if(data.type == "whisper"){
		if(chat.childNodes.length > 200)	$(chat.childNodes[0]).remove();

		if(username == data.rec){
			var whisper = "De " + data.name + ": " + data.text;

			whisper = whisper.bold().fontcolor('#D04E98');

			$(chat).append("<p class='msg'>" + whisper + "</p>");
		}
	}

	else if(data.type == "addNewClass"){
		insertNewClass(data.name);
	}

	else if(data.type == "addNewSkill"){
		insertNewSkill(data.name);
	}

	else if(data.type == "validateMove"){
		moveReqData = [];
		$(chat).append("<p class='msg'> Movimientos validados. </p>");
		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	else if(data.type == "validateAttack"){
		attackReqData = [];
		$(chat).append("<p class='msg'> Ataques validados. </p>");
		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	else if(data.type == "moveRequest"){
		if(chat.childNodes.length > 200)	$(chat.childNodes[0]).remove();

		$(chat).append("<p class='msg'>" + data.text + "</p>");
		
		audioChat.play();
		
		moveReqChecker( data.posX, data.posY, data.color, data.moveOwner );

		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	else if(data.type == "attackRequest"){
		if(chat.childNodes.length > 200)	$(chat.childNodes[0]).remove();

		$(chat).append("<p class='msg'>" + data.text + "</p>");
		
		audioChat.play();
		
		attackReqChecker( data.posX, data.posY, data.color );

		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	else if(data.type == "diceRoll"){
		if(chat.childNodes.length > 200)	$(chat.childNodes[0]).remove();

		var toAppend = "<p class='msg'>" + data.name.toUpperCase() + " prepara los dados! " + data.text + "</p>";

		toAppend = toAppend.bold().fontcolor("green");

		$(chat).append( toAppend );
		
		audioChat.play();
		
		chat.scrollTop = chat.scrollHeight;

		$(chat).animate({
			  scrollTop:  10000000000000
		 });
	}
    
    else if(data.type == "user"){
		$(chat).append("<p class='msg'> " + data.name + data.text);
	}

	else if(data.type == "newConn"){
		userConnected(data.name);
		if(masterMode){
			server.sendMessage({type: "partic", list: participants});
		}
	}

	else if(data.type == "partic"){
		participants = data.list;
		addtolist();
	}

	else if(data.type == "addchar"){
		if(masterMode){
			addchar(data.style, data.src, data.owner);
		}
	}
	
	else if(data.type == "canvasErase"){
		liner = [];
	}
	
	else if(data.type == "clearer"){
		eraseCanvas(0, 0, canvasWidth, canvasHeight);
	}
	
	else if(data.type == "tiles"){
		repaintRecievedTiles(data.string);
	}

	else if(data.type == "characters"){
		repaintRecievedCharacters(data.string);
	}

	else if(data.type == "playMusic"){
		playMusic( data.src );
	}
	else if(data.type == "stopMusic"){
		stopMusic();
	}

}

//METODO CUANDO UN USUARIO SE CONECTA
server.on_user_connected = function(id){
	//Empty...
}

//LLAMADA CUANDO UN USUARIO SE DESCONECTA
server.on_user_disconnected = function(id){
	$("#chat").append("<p class='msg'>Un aventurero ha abandonado ... </p>");
	$("#cursor-" + id).remove();
}

//METODO EJECUTADO AL DESCONECTAR EL SERVIDOR
server.on_close = function(){
	$("#server_info").html( "<span class='btn btn-danger'>Desconectado</span> El servidor no responde." );
	$(".cursor").remove();
};