import {disableInput} from 'https://cdn.jsdelivr.net/gh/jscroot/element@0.1.7/croot.js';

var conn;
const myId=getRandomColor();
const sep='|||';
const msg = document.getElementById("msg");
const log = document.getElementById("log");
const btn = document.getElementById("sendbutton");

function appendLog(item) {
  var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
  var firstMessage =log.firstChild;
  log.insertBefore(item,firstMessage);
  if (doScroll) {
    log.scrollTop = log.scrollHeight - log.clientHeight;
  }
}

btn.onclick = function () {
  if (!conn) {
    return false;
  }
  if (!msg.value) {
    return false;
  }
  conn.send(myId+sep+msg.value);
  msg.value = "";
  return false;
};

if (window["WebSocket"]) {
  conn = new WebSocket("wss://wss.do.my.id/ws");
  conn.onclose = function (evt) {
    var item = document.createElement("div");
    item.innerHTML = "<b>Connection closed.</b>";
    appendLog(item);
    disableInput('msg');
    disableInput('sendbutton');
  };
  conn.onmessage = function (evt) {
    var ident = getFrom(myId,evt.data,sep)
    var messages = ident.txt.split('\n');
    for (var i = 0; i < messages.length; i++) {
      var item = document.createElement("div");
      item.classList.add('chat-message', ident.cls);//tambah kelas
      item.innerText = messages[i];
      appendLog(item);
    }
  };
} else {
  var item = document.createElement("div");
  item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
  appendLog(item);
}


msg.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      document.getElementById("sendbutton").click();
  }
});


function makeid(length) {
  let result = '';
  const characters = '⚽️🏀🏈⚾️🥎🎾🏐🏉🥏🎱🪀🏓🏸🏒🏑🥍🏏🍏🍎🍋‍🟩🍌🍉🍇🍓🐶🐱🐭🐹🐰🦊🐻🐼🐻‍❄️🐨🐯🦁🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦‍⬛🐤🐣🐥🦆🦅🦉🦇🐺🐗😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function getFrom(myid,message,sep){
  var cls;
  var txt;
  if (message.includes(myid+sep)){
    cls='user'; 
    txt=message.replace(myid+sep,'');
  }else{
    cls='other'; 
    txt=message.split(sep)[1];
  }
  return {cls,txt};
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}