var gameField;
var context;
var gameWidth = '1440';
var gameHeight = '1440';
var mouseX = 0;
var mouseY = 0;
var matrixMap = [];
var matrixMapChecker = false;
var tileSelected = 1;
var grass, water, castle;
var tileType = [];
var editMode = false;
var interval;
var masterMode = false;
var charactersToCreate = [];
var charactersChecker = [];
var characters = [];
var mousePressed = false;
var dragging = false;
var moveReq = false;
var moveReqData = [];
var attackReq = false;
var attackReqData = [];
var ftime = true;
var boot;
var sword;
var dayNight = 1;
var userColor = '';
var participants = [];
var swim = false;
var climb = false;
var charActivated = false;
var controller = false;
var controller2 = false;
var moveIndex = 4;
var checkServer = false;
var roomLevels = 1;
var tileLevel = 1;
var personalTiles = [];
var personalChars = [];
var personalClasses = [];
var personalSkills = [];
var count = 0;

function initEditor(){

	var gameContainer = document.getElementById('editor-container');

	for( var i = 0; i < (gameWidth/'32'); i++ ){
		matrixMap[i] = [];
	}

	//DESTROY MAP
	//server.storeData(roomPHP+"tiles"+tileLevel, matrixMap);

	if(statusPlayer == 'Master') masterMode = true;

	participants.push(userPHP);

	if(masterMode) addtolist();

	gameField = document.getElementById('canvas');

	gameField.setAttribute('style', 'background: #3D3D3D;');

	gameContainer.appendChild(gameField);

	context = gameField.getContext("2d");

	gameField.addEventListener("mousemove", setMousePosition, false);

	gameField.addEventListener("click", putTile, false);

	gameField.addEventListener("click", moveRequest, false);

	gameField.addEventListener("click", attackRequest, false);

	gameField.addEventListener('mousedown', function(e){ interval = setInterval(putTile, 10); });

	gameField.addEventListener('mouseup', function(e){ clearInterval(interval); });

	gameField.addEventListener('mouseout',function(e){ clearInterval(interval); });

	if(masterMode) gameField.addEventListener('contextmenu', function(e) { 	
		if(moveReq) moveReq = false;
		else if(attackReq) attackReq = false;
		else deleteChar(); 
	});

	window.addEventListener( "keypress", keyDown, false );

	$(document).mousedown(function(){ if(masterMode) mousePressed = true; }).mouseup(function(){ mousePressed = false; dragging = false; });

	loadImagesAndChars();

	if(masterMode){
		server.loadData(roomPHP+'levels', function(data){
			if(data != undefined) roomLevels = parseInt(data);
		});

		setTimeout(function(){
  			if(roomLevels != 1){
				reconstruct(roomLevels-1);
			}
		}, 1000);
	}

	boot = new Image(); 
	boot.src = "assets/img/boot.gif";
	sword = new Image(); 
	sword.src = "assets/img/sword.png";

	window.setInterval(function(){ 
		render();
	}, 10 );

}

function render(){
	context.clearRect(0, 0, canvas.width, canvas.height);

	for( var i = 0; i < matrixMap.length; i++ ){
		for( var j = 0; j < matrixMap[i].length; j++ ){
			
			var positionX = 0;
			if(i == 1) positionX = 0;
			else positionX = (i-1)*32;

			var positionY = 0;
			if(j == 1) positionY = 0;
			else positionY = (j-1)*32;

			if(matrixMap[i][j] != undefined && matrixMap[i][j] != ''){
				//console.log("Index: " + matrixMap[i][j]-1);
				context.drawImage(tileType[matrixMap[i][j]-1], positionX, positionY);
			}
		}
	}

	if(masterMode && !editMode){
		for(var i = 0; i < characters.length; i++){
			characters[i].data.update();
		}
	}

	if(!masterMode){	
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

	context.beginPath();

	grid();
	
	for(var i = 0; i < moveReqData.length; i = i+4){

		context.beginPath();

		for(var j=0; j < 3; j++){
			context.rect( moveReqData[i], moveReqData[i+1], 32, 32);
		}
		
		context.drawImage(boot,moveReqData[i],moveReqData[i+1]);
		context.strokeStyle = moveReqData[i+2];
		context.stroke();

	}


	for(var i = 0; i < attackReqData.length; i = i+3){
		
		context.beginPath();

		for(var j=0; j < 3; j++){
			context.rect( attackReqData[i], attackReqData[i+1], 32, 32);
		}

		context.drawImage(sword,attackReqData[i],attackReqData[i+1]);
		context.strokeStyle = attackReqData[i+2];
		context.stroke();
	}

	var posX = getXPosition(mouseX);
	var posY = getYPosition(mouseY);

	context.beginPath();

	context.rect( posX, posY, 32, 32);
	context.strokeStyle = "#FFFFFF";
	context.stroke();

	if(masterMode){
		var jsonChars, jsonTiles;
		jsonTiles = JSON.stringify(matrixMap);
		if(matrixMapChecker){
			server.storeData(roomPHP+'tiles'+tileLevel, jsonTiles);
			server.sendMessage({type:"tiles", string: jsonTiles});
			matrixMapChecker = !matrixMapChecker;
		}
	
		jsonChars = JSON.stringify(characters);
		if(charactersChecker != jsonChars && dragging == false && controller2 == true){
			server.storeData(roomPHP+'chars', jsonChars);
			server.sendMessage({type:"characters", string: jsonChars});
			charactersChecker = jsonChars;
		}
	}
	
	if(!masterMode && moveReq){
		for(var i = 0; i < characters.length; i++){
			if( characters[i].owner == userPHP ){
				for(var w = 1; w <= moveIndex; w++){
					for(var j = 0; j < 3; j++){
						context.fillStyle = 'rgba(0, 0, 255, 0.1)';
						context.fillRect(characters[i].data.x, characters[i].data.y+(w*32), 32, 32);
						context.fillRect(characters[i].data.x, characters[i].data.y-(w*32), 32, 32);
						context.fillRect(characters[i].data.x+(w*32), characters[i].data.y, 32, 32);
						context.fillRect(characters[i].data.x-(w*32), characters[i].data.y, 32, 32);

						for(var z = 1; z < w; z++){
							context.fillRect(characters[i].data.x+((moveIndex+1-w)*32), characters[i].data.y+(z*32), 32, 32);
							context.fillRect(characters[i].data.x+((moveIndex+1-w)*32), characters[i].data.y-(z*32), 32, 32);
							context.fillRect(characters[i].data.x-((moveIndex+1-w)*32), characters[i].data.y+(z*32), 32, 32);
							context.fillRect(characters[i].data.x-((moveIndex+1-w)*32), characters[i].data.y-(z*32), 32, 32);
						}
					}
				}
			}
		}
	}

	if(!masterMode){
		for(var i = 0; i < characters.length; i++){
			if( characters[i].owner == userPHP ){
				charActivated = true;
			}
			else charActivated = false;
		}
	}

}

function repaintRecievedTiles( sharedTiles ){
	matrixMap = JSON.parse(sharedTiles);
}

function repaintRecievedCharacters( sharedChars ){
	charactersToCreate = JSON.parse(sharedChars);
}