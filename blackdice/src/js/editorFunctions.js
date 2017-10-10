
function edition(){
	editMode = !editMode;
}

function requesting( action ){
	if(action == 'm') moveReq = true;
	if(action == 'a') attackReq = true;

	$("#chat").append("<p class='msg'> Pulsa sobre la casilla en la que deseas realizar tu accion. </p>");
}

function validate( action ){
	if(action == 'm'){
		moveReqData = [];	
		server.sendMessage({type:"validateMove"});	
 		$("#chat").append("<p class='msg'> Movimientos validados. </p>");
		var chat = document.getElementById("chat");
    	chat.scrollTop = chat.scrollHeight;
	}

	if(action == 'a'){
		attackReqData = [];	
		server.sendMessage({type:"validateAttack"});	
 		$("#chat").append("<p class='msg'> Ataques validados. </p>");
		var chat = document.getElementById("chat");
		chat.scrollTop = chat.scrollHeight;
	}
}

function keyDown(e){

	var keyCode = e.keyCode;


	//MASTER COMMANDS
	if(masterMode){

		if(editMode){

		}
		else{

		}

	}

	//PLAYER COMMANDS
	if(!masterMode){
	}

}

function putTile(){

	if(editMode && masterMode){
		var cellNumX = Math.ceil( mouseX / 32.000 );
		var cellNumY = Math.ceil( mouseY / 32.000 );

		//ESTO ANTES ESTABA EN UNDEFINED
		if(tileSelected == 'del') matrixMap[cellNumX][cellNumY] = undefined;
		else{
			matrixMap[cellNumX][cellNumY] = tileSelected;
		}

		matrixMapChecker = true;
	}

}

function loadImagesAndChars(){

	grass = new Image();
	grass.src = "assets/img/tiles/grass_tile.png";
	tileType[0] = grass;

	water = new Image();
	water.src = "assets/img/tiles/water_tile.png";
	tileType[1] = water;

	tree = new Image();
	tree.src = "assets/img/tiles/tree_tile.png";
	tileType[2] = tree;

	server.loadData(roomPHP+"personalTiles", function(data){
		if(data != undefined){
			var array = data.split(',');
			personalTiles = array;
			for(var i = 0; i < personalTiles.length; i=i+2){
				recoverTiles(personalTiles[i], personalTiles[i+1]);
			}
		}
	});

	server.loadData(roomPHP+"personalChars", function(data){
		if(data != undefined){
			var array = data.split(',');
			personalChars = array;
			for(var i = 0; i < personalChars.length; i=i+2){
				recoverChars(personalChars[i], personalChars[i+1]);
			}
		}
	});

	//DESTROY EXTRA TILES
	//server.storeData(roomPHP+"personalTiles", undefined);
}


//Ejecutado a cada momento para rastrear el raton
function setMousePosition(e) {

	var BB = gameField.getBoundingClientRect();

	var x = e.clientX - BB.left;
	var y = e.clientY - BB.top;
	y = Math.ceil(y);
  	
  	mouseX = x;
	mouseY = y;

}

//Funciones para determinar la celda donde estamos
function getXPosition(mouseX){

	var cellNumX = Math.ceil( mouseX / 32.000 );
	var positionX = 0;

	if(cellNumX == 1) positionX = 0;
	else positionX = (cellNumX-1)*32;

	return positionX;

}

function getYPosition(mouseY){

	var cellNumY = Math.ceil( mouseY / 32.000 );
	var positionY = 0;

	if(cellNumY == 1) positionY = 0;
	else positionY = (cellNumY-1)*32;

	return positionY;

}

function selectTile( num ){
	console.log("Num: " + num);
	tileSelected = num;
}

function grid(){

	for(var i = 0; i < gameWidth+.1 || i < gameHeight+.1; i += 32) {

	    //Horizontal Lines
	    context.moveTo( i, 0 );
	    context.lineTo( i, gameHeight);

	    //Vertical Lines
	    context.moveTo( 0, i );
	    context.lineTo( gameWidth, i);
	}

	context.strokeStyle = "#777777";
	context.stroke();

}

function addchar( type, src, owner ){

	if(editMode == false && masterMode){
		var newChar;
		newChar = new DragImage(src, 352, 224);
		characters.push({data: newChar, src: src, owner: owner});
	}
}

function deleteChar(){
	var posX = getXPosition(mouseX);
	var posY = getYPosition(mouseY);

	var secondaryChar = [];

	for(var i = 0; i < characters.length; i++){
		if(posX == characters[i].data.x && posY == characters[i].data.y){}
		else{
			secondaryChar.push(characters[i]);
		}
	}

	characters = secondaryChar;

}


function playMusic( src ){
	var audio = document.getElementById("musicplaying");

	if( audio == null){
		audio = document.createElement("audio");
		audio.setAttribute("src", src);
		audio.setAttribute("type", "audio/mp3");
		audio.setAttribute("id", "musicplaying");

		document.body.appendChild(audio);
	}
	else{
		audio.setAttribute("src", src);
	}

	var toPlay = document.getElementById("musicplaying");
	toPlay.play();
	toPlay.loop = true;

	if(masterMode) server.sendMessage({type:"playMusic", src: src});
}

function stopMusic( src ){

	var toPlay = document.getElementById("musicplaying");
	if(toPlay != null) toPlay.pause();

	if(masterMode) server.sendMessage({type:"stopMusic"});

}

function showHour( t ){

	if(masterMode){
		server.sendMessage({type: 'hour', time: document.getElementById("myTime").value});
		server.storeData(roomPHP+"time", document.getElementById("myTime").value);
	}
	else{
		document.getElementById("myTime").value = t;
	}

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
}

function showCity( l ){

	if(masterMode){
		server.sendMessage({type: 'city', locat: document.getElementById("location").value});
		server.storeData(roomPHP+"location", document.getElementById("location").value);
	}
	else{
		document.getElementById("location").value = l;
	}

}

function color(picker){
	userColor = picker.toHEXString();
}

function userConnected(newguy){

	if( $.inArray(newguy, participants) > -1 ){}
	else{ 
		participants.push(newguy); 
		addtolist();
	}
}

function addtolist(){
	var node = document.getElementById("playerList");
	var playerMenu = document.getElementById("playerMenu");
	playerMenu.removeChild(node);

	var ulThird = document.createElement("ul");
	ulThird.setAttribute("id", "playerList");
    ulThird.setAttribute("class", "dropdown-menu");

    for(i = 0; i < participants.length; i++){

      var aFirst = document.createElement("a");
      var uN = document.createTextNode(participants[i]);
      aFirst.appendChild(uN);

      var liSec = document.createElement("li");
      liSec.appendChild(aFirst);

      ulThird.appendChild(liSec);

    }

    playerMenu.appendChild(ulThird);

}

function setAttributes(){


	var myName = document.getElementById("pjName").value;
	var hp = document.getElementById("pjHP").value;
	var mana = document.getElementById("pjMANA").value;
	var e = document.getElementById("classSelect").value;

	var skillCheck = [];

	if( document.getElementById("s1").checked ) skillCheck.push(true);
	else skillCheck.push(false);
	if( document.getElementById("s2").checked ) skillCheck.push(true);
	else skillCheck.push(false);

	for( var i = 0; i < personalSkills.length; i++){
		if( document.getElementById("s"+(i+3).toString()).checked ){
			skillCheck.push(true);
		}
		else{
			skillCheck.push(false);
		}
	}

	var infoPJ = [myName, hp, mana, e, skillCheck];

	var identificator = roomPHP+userPHP;

	switch(e){
		case '1': moveIndex = 6; break;
		default: moveIndex = 4; break;
	}

	server.storeData(identificator, infoPJ);

}

function askToaddchar( type, src, owner ){
	if(charActivated){
		var message = "¡Ya tienes una figura!";
		message = message.bold().fontcolor("#AE0001");
		$("#chat").append("<p class='msg'>" + message +"</p>");	
	}
	else{
		charActivated = true;
		server.sendMessage({type:"addchar", style: type, src: src, owner: owner});
	}

}

function changeLevel(level){
	tileLevel = level;
	console.log("Changing to level: " + tileLevel);
	
	server.loadData(room_name+'tiles'+tileLevel, function(data) { 
		if(data != undefined) matrixMap = JSON.parse(data);
		else{
			matrixMap = [];
			for( var i = 0; i < (gameWidth/'32'); i++ ){
				matrixMap[i] = [];
			}
		}
	});

	setTimeout(function(){
		jsonTiles = JSON.stringify(matrixMap);
		server.sendMessage({type:"tiles", string: jsonTiles});
	}, 1000);

}

function deleteTile( tileName ){
	console.log(tileName);
	console.log("Deleting");
}

function addLevel(){
	roomLevels = roomLevels+1;
	server.storeData(roomPHP+'levels', roomLevels);
	console.log(roomLevels);

	var newIMG = document.createElement("img");
	newIMG.setAttribute("src", "assets/img/house.png");
	newIMG.setAttribute("id", "charimg");

	var newBUTTON = document.createElement("button");
	newBUTTON.setAttribute("id", "throwButtonID1");
	newBUTTON.setAttribute("type", "button");
	newBUTTON.setAttribute("style", "margin-left:5%");
	newBUTTON.setAttribute("onclick", "changeLevel("+roomLevels+")");
	var t = document.createTextNode("Acceder");
	newBUTTON.appendChild(t);

	var newA = document.createElement("a");
	var t2 = document.createTextNode(" Nivel "+roomLevels);
	newA.appendChild(newIMG);
	newA.appendChild(t2);
	newA.appendChild(newBUTTON);

	var newLI = document.createElement("li");
	newLI.appendChild(newA);

	var levelList = document.getElementById("levelList");
	levelList.appendChild(newLI);


}

function reconstruct( newlevels ){
	for(var i = 0; i < newlevels; i++){
		var newIMG = document.createElement("img");
		newIMG.setAttribute("src", "assets/img/house.png");
		newIMG.setAttribute("id", "charimg");

		var newBUTTON = document.createElement("button");
		newBUTTON.setAttribute("id", "throwButtonID1");
		newBUTTON.setAttribute("type", "button");
		newBUTTON.setAttribute("style", "margin-left:5%");
		newBUTTON.setAttribute("onclick", "changeLevel("+ (i+2) +")");
		var t = document.createTextNode("Acceder");
		newBUTTON.appendChild(t);

		var newA = document.createElement("a");
		var t2 = document.createTextNode(" Nivel "+ (i+2) );
		newA.appendChild(newIMG);
		newA.appendChild(t2);
		newA.appendChild(newBUTTON);

		var newLI = document.createElement("li");
		newLI.appendChild(newA);

		var levelList = document.getElementById("levelList");
		levelList.appendChild(newLI);
	}
}

function addNewChar( charName, charsrc){
		if(charsrc == "" || charsrc == undefined){}
		else{
			var newIMG = document.createElement("img");
			newIMG.setAttribute("src", charsrc);
			newIMG.setAttribute("id", "charimg");

			var newBUTTON = document.createElement("button");
			newBUTTON.setAttribute("id", "throwButtonID1");
			newBUTTON.setAttribute("type", "button");
			newBUTTON.setAttribute("style", "margin-left:5%");

			var tileNum = (tileType.length+1);
			newBUTTON.setAttribute("onclick", "addchar('" + charName + "', '" + charsrc + "')");
			var t = document.createTextNode("Seleccionar");
			newBUTTON.appendChild(t);

			var newA = document.createElement("a");
			var t2 = document.createTextNode(charName);
			newA.appendChild(newIMG);
			newA.appendChild(t2);
			newA.appendChild(newBUTTON);

			var newLI = document.createElement("li");
			newLI.appendChild(newA);

			var charList = document.getElementById("charList");
			charList.appendChild(newLI);

			personalChars.push( charName );
			personalChars.push( charsrc );

			server.storeData(roomPHP+"personalChars", personalChars);
			server.sendMessage({type: 'addedchar', array: personalChars});
		}
}

function recoverChars( charName, charsrc){
		var newIMG = document.createElement("img");
		newIMG.setAttribute("src", charsrc);
		newIMG.setAttribute("id", "charimg");

		var newBUTTON = document.createElement("button");
		newBUTTON.setAttribute("id", "throwButtonID1");
		newBUTTON.setAttribute("type", "button");
		newBUTTON.setAttribute("style", "margin-left:5%");

		var tileNum = (tileType.length+1);
		if(masterMode) newBUTTON.setAttribute("onclick", "addchar('" + charName + "', '" + charsrc + "')");
		else{
			newBUTTON.setAttribute("onclick", "askToaddchar('" + charName + "','" + charsrc + "','" + userPHP + "')");
			console.log("Jugador");
		}
		var t = document.createTextNode("Seleccionar");
		newBUTTON.appendChild(t);

		var newA = document.createElement("a");
		var t2 = document.createTextNode(charName);
		newA.appendChild(newIMG);
		newA.appendChild(t2);
		newA.appendChild(newBUTTON);

		var newLI = document.createElement("li");
		newLI.appendChild(newA);
console.log("Char SRC: " + charsrc);
		var charList = document.getElementById("charList");
		charList.appendChild(newLI);
}

function addNewTile( tileName, tilesrc ){
	if(tilesrc == "" || tilesrc == undefined){}
	else{
		var newIMG = document.createElement("img");
		newIMG.setAttribute("src", tilesrc);
		newIMG.setAttribute("id", "charimg");

		var newBUTTON = document.createElement("button");
		newBUTTON.setAttribute("id", "throwButtonID1");
		newBUTTON.setAttribute("type", "button");
		newBUTTON.setAttribute("style", "margin-left:5%");

		var tileNum = (tileType.length+1);
		newBUTTON.setAttribute("onclick", "selectTile(" + tileNum + ")");
		var t = document.createTextNode("Seleccionar");
		newBUTTON.appendChild(t);

		var newA = document.createElement("a");
		var t2 = document.createTextNode(tileName);
		newA.appendChild(newIMG);
		newA.appendChild(t2);
		newA.appendChild(newBUTTON);

		var newLI = document.createElement("li");
		newLI.appendChild(newA);

		var levelList = document.getElementById("tileList");
		levelList.appendChild(newLI);

		var name = new Image();
		name.src = tilesrc;
		tileType[tileNum-1] = name;

		personalTiles.push(tileName);
		personalTiles.push(tilesrc);

		server.sendMessage({type: "addedTile", name: tileName, src: tilesrc});

		server.storeData(roomPHP+"personalTiles", personalTiles);
	}
	
}

function recoverTiles(tileName, tilesrc){

	if(masterMode){
		var newIMG = document.createElement("img");
		newIMG.setAttribute("src", tilesrc);
		newIMG.setAttribute("id", "charimg");

		var newBUTTON = document.createElement("button");
		newBUTTON.setAttribute("id", "throwButtonID1");
		newBUTTON.setAttribute("type", "button");
		newBUTTON.setAttribute("style", "margin-left:5%");

		var tileNum = (tileType.length+1);
		newBUTTON.setAttribute("onclick", "selectTile(" + tileNum + ")");
		var t = document.createTextNode("Seleccionar");
		newBUTTON.appendChild(t);

		var newA = document.createElement("a");
		var t2 = document.createTextNode("  " + tileName);
		newA.appendChild(newIMG);
		newA.appendChild(t2);
		newA.appendChild(newBUTTON);
		
		var newLI = document.createElement("li");
		newLI.appendChild(newA);

		var levelList = document.getElementById("tileList");
		levelList.appendChild(newLI);
	}

	var name = new Image();
	console.log("Tile SRC: " + tilesrc);
	name.src = tilesrc;
	var tileNum = (tileType.length+1);
	tileType[tileNum-1] = name;

}

function addNewClass(){
	var newC = document.getElementById('newClassNAME').value;
	if( newC != "" && newC != null){
		personalClasses.push(newC);
		insertNewClass(newC);
		server.storeData(roomPHP+'classes', personalClasses);
		server.sendMessage({type:"addNewClass", name: newC});
	}
}

function addNewSkill(){
	var newS = document.getElementById('newSkillNAME').value;
	if( newS != "" && newS != null){
		personalSkills.push(newS);
		insertNewSkill(newS);
		server.storeData(roomPHP+'skills', personalSkills);
		server.sendMessage({type:"addNewSkill", name: newS});
	}
}

function insertNewClass(className){
	var newOption = document.createElement("option");
	newOption.setAttribute("value", "");
	newOption.text = className;
	var selector = document.getElementById("classSelect");
	selector.appendChild(newOption);
}

function insertNewSkill(skillName){

	var newInput = document.createElement("input");
	newInput.setAttribute("type", "checkbox");
	newInput.setAttribute("name", "skill");
	newInput.setAttribute("id", "s" + (3 + count).toString());
	var t = document.createTextNode("  Habilidad Secundaria: " + skillName);

	var div = document.getElementById("skillz");
	div.appendChild(newInput);
	div.appendChild(t);
	var br = document.createElement("br");
	div.appendChild(br);
	count = count + 1;
}