function clearChat(){
        $("#chat").empty();
        $("#chat").append("<p class='msg'> Chat regenerado! </p>");
}

function sendChatText(){
    var message = document.getElementById("Write").value;
    document.getElementById("Write").value = "";

    if(message != ''){
    
        if(message.charAt(0) == '/'){
            if(message.charAt(1) == 'w'){
                var p1 = message.substr(message.indexOf(' ')+1);

                var userN = p1.substr(0, p1.indexOf(' '));

                var mesS = p1.substr(p1.indexOf(' ')+1);

                var whisper = "Para " + userN + ": " + mesS;

                whisper = whisper.bold().fontcolor('#D04E98');

                if( $.inArray(userN, participants) > -1 ){
                    $("#chat").append("<p class='msg'>" + whisper + "</p>");
                    var charName = document.getElementById("pjName").value; 

                    if( charName != undefined && charName != null && charName != "" )   server.sendMessage({type:"whisper", text:mesS, rec:userN, name: charName}); 
                    else server.sendMessage({type:"whisper", text:mesS, rec:userN, name: username}); 

                }
                else{
                    var err = "¡No hay nadie con ese nombre por aqui!";
                    err = err.bold().fontcolor('#AE0001');
                    $("#chat").append("<p class='msg'>" + err + "</p>");
                }
            } 

            else if(message.charAt(1) == 'a'){
               var action = message.substr(message.indexOf(' ')+1);
               var charName = document.getElementById("pjName").value; 
               if( charName != undefined && charName != null && charName != "" )   var actionMessage = document.getElementById("pjName").value + " " + action;
               else var actionMessage = username + " " + action;
               actionMessage = actionMessage.italics().fontcolor('#15635A');
               server.sendMessage({type:"actionM", text: actionMessage});
               $("#chat").append("<p class='msg'>" + actionMessage + "</p>");
            }

            else if(message.charAt(1) == 'h'){

                var h1 = "COMANDOS UTILIZABLES:";
                var h2 = "Susurro: /w Nombre Mensaje";
                var h3 = "Mensaje interpretativo: /a Mensaje";

                h1 = h1.bold().fontcolor('#003B6F');
                h2 = h2.bold().fontcolor('#003B6F');
                h3 = h3.bold().fontcolor('#003B6F');

                $("#chat").append("<p class='msg'>" + h1 + "</p>");
                $("#chat").append("<p class='msg'>" + h2 + "</p>");
                $("#chat").append("<p class='msg'>" + h3 + "</p>");
            }

            else{
                var err = "Comando inexistente.";
                err = err.bold().fontcolor('#AE0001');
                $("#chat").append("<p class='msg'>" + err + "</p>");
            }
            
        }

        else{
            $("#chat").append("<p class='msg'>" + "Tu: ".bold() + message +"</p>");

            var charName = document.getElementById("pjName").value;

            if( charName != undefined && charName != null && charName != ""){
                if(!masterMode) server.sendMessage({type:"chat", text: message, name: document.getElementById("pjName").value, color: userColor});
                else server.sendMessage({type:"chatgm", text: message, name: document.getElementById("pjName").value, color: userColor});
            }
            else{
                if(!masterMode) server.sendMessage({type:"chat", text: message, name: username, color: userColor});
                else server.sendMessage({type:"chatgm", text: message, name: username, color: userColor});
            }
        }           
    }

	var chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;

}