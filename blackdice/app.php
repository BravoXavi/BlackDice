<?php

  $username = $_GET["unam"];
  $roomName = $_GET["rnam"];
  $status = $_GET["s"];

?>

<script type="text/javascript">
   var userPHP = "<?php echo $username; ?>";
   var roomPHP = "<?php echo $roomName; ?>";
   var statusPlayer = "<?php echo $status; ?>";
   var edit = "Edit Mode: OFF";
</script>

<!DOCTYPE html>
<html lang="en">

  <head>

  	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="Main application">
    <meta name="author" content="Xavier Bravo Guillen - TFG2016 - Universitat Pompeu Fabra">
    <link rel="shortcut icon" href="assets/img/headicon.png">

    <title>BlackDice</title>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link href="assets/css/editorPage.css" rel="stylesheet">
    <link href="assets/css/popup.css" rel="stylesheet">
    <link href="assets/css/popup_pj.css" rel="stylesheet">
	  <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="src/js/modal.js"></script>
    <script src="src/js/jscolor.js"></script>

  </head>

  <body oncontextmenu="return false;">

    <div class="top">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header" style= "margin-right: 3%">
            <a href="profile.php"><img src="assets/img/blackdicelogo.png" style= "margin-top: 4%"></a>
          </div>
          <ul class="nav navbar-nav">

            <li class="dropdown">
              <a class='modalPJ'>Mi Ficha</a>;
            </li>

            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Acciones
              <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#"><img id="charimg" src="assets/img/sword.png"> Atacar <button id="throwButtonID1" style="margin-left:4%" type="button" onclick="requesting('a')"> <b>Solicitar</b> </button> </a></li>
                <li><a href="#"><img id="charimg" src="assets/img/boot.gif"> Mover <button id="throwButtonID2" style="margin-left:8%" type="button" onclick="requesting('m')"> <b>Solicitar</b> </button> </a> </li>
                <?php
                  if( $status == 'Master'){
                    echo "<li><a href='#'><img id='charimg' src='assets/img/tick.png'><button id='throwButtonID2' style='margin-left:8%' type='button' onclick=validate('m')><b> Validar movimiento </b></button></a></li>";
                    echo "<li><a href='#'><img id='charimg' src='assets/img/tick.png'><button id='throwButtonID2' style='margin-left:8%' type='button' onclick=validate('a')><b> Validar ataque </b></button></a></li>";
                  }
                ?>
              </ul>
            </li>

            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Personajes
              <span class="caret"></span></a>
              <?php
              if( $status == 'Master' ){
               echo "<ul id='charList' class='dropdown-menu'>";
               echo   "<li><a href='#'><img id='charimg' src='assets/img/characters/warrior.png'> Guerrero <button id='throwButtonID1' type='button' onclick=addchar('warrior','assets/img/characters/warrior.png','private') > <b>Añadir</b> </button> </a></li>";
               echo   "<li><a href='#'><img id='charimg' src='assets/img/characters/mage.png'>    Mago     <button id='throwButtonID2' type='button' onclick=addchar('mage','assets/img/characters/mage.png','private') >   <b>Añadir</b> </button> </a></li>";
               echo   "<li><a href='#'><img id='charimg' src='assets/img/characters/rogue.png'> Explorador <button id='throwButtonID3' type='button' onclick=addchar('rogue','assets/img/characters/rogue.png','private')> <b>Añadir</b> </button>  </a></li>";
               echo   "<li><a href='#'><img id='charimg' src='assets/img/enemies/slime.png'> Limo <button id='throwButtonID3' style='margin-left:28.5%' type='button' onclick=addchar('slime','assets/img/enemies/slime.png','private')> <b>Añadir</b> </button> </a> </li>";
               echo   "<li><a href='#'><img id='charimg' src='assets/img/enemies/ghoul.png'> Zombi <button id='throwButtonID3' style='margin-left:25%' type='button' onclick=addchar('ghoul','assets/img/enemies/ghoul.png','private')> <b>Añadir</b> </button> </a> </li>";
               echo "<br><li><button id='throwButtonID1' type='button' class='modalchar'> <b>Añadir nuevo personaje</b> </button></li><br>";
               echo "</ul>";
              }
              else if($status != 'Master'){
               echo "<ul id='charList' class='dropdown-menu'>";
               echo "<li><a href='#'><img id='charimg' src='assets/img/characters/warrior.png'> Guerrero <button id='throwButtonID1' type='button' onclick=" . "askToaddchar('warrior','assets/img/characters/warrior.png','".$username."')" . "> <b>Añadir</b> </button>  </a></li>";
               echo "<li><a href='#'><img id='charimg' src='assets/img/characters/mage.png'> Mago <button id='throwButtonID2' type='button' onclick=" . "askToaddchar('mage','assets/img/characters/mage.png','".$username."')" . "> <b>Añadir</b> </button> </a> </li>";
               echo "<li><a href='#'><img id='charimg' src='assets/img/characters/rogue.png'> Explorador <button id='throwButtonID3' type='button' onclick=" . "askToaddchar('rogue','assets/img/characters/rogue.png','".$username."')" . "> <b>Añadir</b> </button> </a> </li>";
               echo "</ul>";
              }
              ?>
            </li>

            <li class="dropdown" id="playerMenu">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Jugadores
              <span class="caret"></span></a>
              <ul class="dropdown-menu" id="playerList">
                <li><a href="#">No hay ningun jugador...</a></li>
              </ul>
            </li>

            <?php

              if( $status == 'Master' ){
                echo "<li class='dropdown'>";
                echo "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Tiles ";
                echo "<span class='caret'></span></a>";
                echo "<ul id= 'tileList' class='dropdown-menu'>";
                echo "<li><a href='#'><img id='charimg' src='assets/img/tiles/grass_tile.png'> Hierba <button id='throwButtonID1' type='button' style='margin-left:5%' onclick=selectTile(1);> <b>Seleccionar</b> </button> </a></li>";
                echo "<li><a href='#'><img id='charimg' src='assets/img/tiles/water_tile.png'> Agua <button id='throwButtonID1' type='button' style='margin-left:13%' onclick=selectTile(2);> <b>Seleccionar</b> </button> </a></li>";
                echo "<li><a href='#'><img id='charimg' src='assets/img/tiles/tree_tile.png'> Arbol <button id='throwButtonID1' type='button' style='margin-left:9%' onclick=selectTile(3);> <b>Seleccionar</b> </button> </a></li>";
                echo "<li><a href='#'><img id='charimg' src='assets/img/tiles/erase.png'> Borrar <button id='throwButtonID1' type='button' style='margin-left:5%' onclick=selectTile('del');> <b>Seleccionar</b> </button> </a></li>";
                echo "<br><li><button id='throwButtonID1' type='button' class='modaltile'> <b>Añadir nuevo tile</b> </button></li><br>";
                echo "</ul>";
                echo "</li>";

                echo "<li class='dropdown'>";
                echo "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Niveles ";
                echo "<span class='caret'></span></a>";
                echo "<ul id='levelList' class='dropdown-menu'>";
                echo "<li><a href='#'><img id='charimg' src='assets/img/house.png'> Nivel 1 <button id='throwButtonID1' type='button'   style='margin-left:5%' onclick=changeLevel(1);> <b>Acceder</b> </button> </a></li>";
                echo "<li><a href='#'><img id='charimg' src='assets/img/hammer.png'> Nuevo nivel <button id='throwButtonID1' type='button'   style='margin-left:5%' onclick=addLevel();> <b>Acceder</b> </button> </a></li>";
                echo "</ul>";
                echo "</li>";
              }

            ?>

            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Dados
              <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#"><input id = "d4cant" type="text" style= "width: 30px"> d4 <button id="throwButtonID" style= "margin: 0 15% 0 16%" type="button" onclick="throwDice(4, document.getElementById('d4cant').value )"><b>Lanzar</b></button></a> </li>
                <li><a href="#"><input id = "d6cant" type="text" style= "width: 30px"> d6 <button id="throwButtonID" style= "margin: 0 15% 0 16%" type="button" onclick="throwDice(6, document.getElementById('d6cant').value )"><b>Lanzar</b></button></a> </li>
                <li><a href="#"><input id = "d6cant" type="text" style= "width: 30px"> d8 <button id="throwButtonID" style= "margin: 0 15% 0 16%" type="button" onclick="throwDice(8, document.getElementById('d8cant').value )"><b>Lanzar</b></button></a> </li>
                <li><a href="#"><input id = "d10cant" type="text" style= "width: 30px"> d10 <button id="throwButtonID" type="button" onclick="throwDice(10, document.getElementById('d10cant').value )"><b>Lanzar</b></button></a> </li>
                <li><a href="#"><input id = "d20cant" type="text" style= "width: 30px"> d20 <button id="throwButtonID" type="button" onclick="throwDice(20, document.getElementById('d20cant').value )"><b>Lanzar</b></button></a> </li>
              </ul>

            <?php
              if( $status == 'Master' ){
                echo "<li>";
                echo "<a class='modalMusic'>Musica</a>";
                echo "</li>";
              }
            ?>

          </ul>
          
          <?php
            if( $status == 'Master'){
              echo "<div class='editorButton'>";
              echo "<b class='simpleButton' id='logout' onclick='toggleText(this.id)'>Modo Edicion: OFF</b>";
              echo "</div>";
            }
          ?>

          <script>
            function toggleText(button_id)  {
               var text = document.getElementById(button_id).firstChild;
               text.data = text.data == "Modo Edicion: OFF" ? "Modo Edicion: ON" : "Modo Edicion: OFF";
               if(text.data == "Modo Edicion: ON")  document.getElementById(button_id).style.backgroundColor = '#4CAF50';
               if(text.data == "Modo Edicion: OFF") document.getElementById(button_id).style.backgroundColor = '#bc1339';
               edition();
            }
          </script>

        </div>
      </nav>
    </div>



    <div class="containerGeneral">

    <div class="gameStatus">
      <div class="gameBox" id="hue">
        <p class="title1">Informacion de la partida</p>
        <div class="line2"></div>
        <br>
        <p style='font-weight: bold'>Jugador:</p>
        <?php echo "<p>" . $username . "</p>"; ?>
        <img src="assets/img/separator.png" style="display: block; margin: auto;"><br>

        <p style='font-weight: bold'>Color:</p>

        <input class="jscolor {onFineChange:'color(this)'}" value="" style= 'display:block; margin: 0 auto 0 auto; width: 80%;'><br>

        <img src="assets/img/separator.png" style="display: block; margin: auto;"><br>

        <img id='daylight' src='assets/img/moon.png' style="display: block; margin: auto;"><br>
        <?php if($status == 'Master'){ 
                echo "<input type='time' id='myTime' value='00:00' style='display:block; margin: 0 auto 0 auto; '><br>"; 
                echo "<button class='timeButton' onclick='showHour( 1 )'>Aceptar</button><br>";
              }
              else{ 
                echo "<input type='time' id='myTime' value='00:00' style='display:block; margin: 0 auto 0 auto;' readonly><br>"; 
                echo "<br>";
              }
        ?>
         
        <img src="assets/img/separator.png" style="display: block; margin: auto;"><br>

        <p style='font-weight: bold'>Localizacion:</p>
        
        <?php if($status == 'Master'){ 
                echo "<input type='text' id='location' value='' style='display:block; margin: 0 auto 0 auto; width: 80%; '><br>";
                echo "<button class='timeButton' onclick='showCity( 1 )' >Aceptar</button> <br>"; 
              }
              else{ 
                echo "<input type='text' id='location' value='' style='display:block; margin: 0 auto 0 auto; width: 80%; 'readonly><br>";
                echo "<br>"; 
              }
        ?>  


      </div>
    </div>

      <div id="editor-container">
        <canvas id="canvas" width="1440" height="1440"></canvas>
      </div> 

      <div class="chat-container">

        <div class="chatBox" id="chat"></div>
        <div class="writeBox">
          <input id="Write" type="text" name="text" style= "border-radius: 5px 5px 5px 5px">
          <button id="Send" type="button" class ="myButtonBlue" onclick="sendChatText()">Enviar</button>
          <button id="Clearer" type="button" class ="myButtonRed" onclick="clearChat()">Limpiar chat</button>
        </div>
    
        <script>
            document.addEventListener('keypress', function(event) {
                if (event.keyCode == 13) {
                    sendChatText();
                }
            });
        </script>

      </div>

    </div>


    <!-- MODAL MUSICA -->
    <div class="popup">
      <p><b>Selecciona uno de los temas</b></p>
      <button class="tancar"><b>X</b></button><br>
      <div class="line"></div>
      <div class="musiclist">
      <i><b>Ciudad</b></i><button class="stop" onclick="stopMusic()"><b>Detener</b></button><button class="play" onclick="playMusic('assets/audio/tavMusic.mp3');"><b>Reproducir</b></button><br><br>
      <i><b>Taberna</b></i><button class="stop" onclick="stopMusic()"><b>Detener</b></button><button class="play" onclick="playMusic('assets/audio/hearth.mp3');"><b>Reproducir</b></button><br><br>
      <b>Reproduce tu propia musica:</b> <br><input id="newMusicSRC" type="text" style= "width: 50%" placeholder="URL">
      <button class="stop" onclick="stopMusic()"><b>Detener</b></button><button class="play" onclick="playMusic(document.getElementById('newMusicSRC').value)"><b>Reproducir</b></button><br><br>
      </div>
    </div>


    <!-- MODAL ADD TILE -->
    <div class="popup_tile">
      <p><b>Nuevo tile</b></p>
      <button class="tancartile"><b>X</b></button><br>
      <div class="line"></div>
      <label style="font-size: 18px"><i>Nombre:</i></label> <input id="newTileNAME" type="text" style= "float:right; width: 70%" ><br><br>
      <label style="font-size: 18px"><i>URL:</i></label> <input id="newTileSRC" type="text" style= "float: right; width: 70%" ><br><br>
      <button id="newTile" type='button' style='margin-left:5%; float: left; border-radius: 1px; border: 1px solid black' onclick="addNewTile(document.getElementById('newTileNAME').value, document.getElementById('newTileSRC').value);"> <b>Añadir</b> </button>
    </div>

    <!-- MODAL ADD CHAR -->
    <div class="popup_char">
      <p><b>Nueva figura</b></p>
      <button class="tancarchar"><b>X</b></button><br>
      <div class="line"></div>
      <label style="font-size: 18px"><i>Nombre:</i></label> <input id="newCharNAME" type="text" style= "float: right; width: 70%" ><br><br>
      <label style="font-size: 18px"><i>URL:</i></label> <input id="newCharSRC" type="text" style= "float:right; width: 70%" ><br><br>
      <button id="newChar" type='button' style='margin-left:5%; float: left; border-radius: 1px; border: 1px solid black' onclick="addNewChar(document.getElementById('newCharNAME').value, document.getElementById('newCharSRC').value);"> <b>Añadir</b> </button>
    </div>

    <!-- MODAL FICHA PJ -->
    <div class="popup_pj">
      <img src="assets/img/scroll.gif" style="float: left;"><p><b>Ficha de Personaje</b></p>
      <button class="tancar2"><b>X</b></button><br>
      <div class="line"></div>
      
      <div style="float: left;">
        <label>Nombre del personaje:</label> <input type="text" style= "width: 100px; float: right" id="pjName" class='cajaFicha'><br><br>
        <label>Puntos de Vida:</label> <input type="text" style= "width: 100px; float: right" id="pjHP" class='cajaFicha'><br><br>
        <label>Puntos de Mana/Energia:</label> <input type="text" style= "width: 100px; float: right" id="pjMANA" class='cajaFicha'><br><br>
        <label>Clase:</label>
          <select style= "width: 100px; float: right" id="classSelect" class='cajaFicha'>
            <option value="">Guerrero</option>
            <option value="">Mago</option>
            <option value="1">Explorador</option>
          </select>
          <br><br>

        <?php
          if($status == 'Master'){
            echo "<input id='newClassNAME' type='text' style= 'width: 55%' class='cajaFicha'><button onclick='addNewClass()' style='float: right;' class='botonFicha'><b>Añadir clase</b></button><br><br>";
          }
        ?>

        <div class="line"></div>

        <?php
          if($status == 'Master'){
            echo "<input id='newSkillNAME' type='text' style= 'width: 55%;' class='cajaFicha'><button onclick='addNewSkill()' style='float: right;' class='botonFicha'><b>Añadir habilidad</b></button><br><br>";
          }
        ?>

        <div id="skillz" style="float: left; overflow: auto; height: 20%; width: 100%">
          <input type="checkbox" name="skill1" value="swim"  id="s1"> Habilidad Secundaria: Nadar<br>
          <input type="checkbox" name="skill2" value="climb" id="s2"> Habilidad Secundaria: Trepar<br>
        </div>

        <div style="float: left;"><button onclick="setAttributes();" class='botonFicha'> <b>Guardar atributos</b> </button></div>

      </div>

    </div>

  	<!-- Scripts and references -->
  	<audio src="assets/audio/audiochat.mp3" type="audio/mp3" id="audioCh">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>
    <script src="src/js/bootstrap/bootstrap.min.js"></script>
	  <script src="src/client/sillyclient.js"></script>
    <script src="src/js/editorFunctions.js"></script>
    <script src="src/js/dragimage.js"></script>
    <script src="src/js/sound.js"></script>
	  <script src="src/js/editor.js"></script>
	  <script src="src/js/serverMessages.js"></script>
    <script src="src/js/chatFunctions.js"></script> 
    <script src="src/js/menuFunctions.js"></script>


    <script type="text/javascript"> 
      $(document).ready(function() {
        initEditor();
      });
    </script>

  </body>

</html>