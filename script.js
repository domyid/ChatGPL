var conn;
var alias=makeid(4);
document.getElementById("judul").innerHTML = alias;
var msg = document.getElementById("msg");
var log = document.getElementById("log");
var btn = document.getElementById("sendbutton");

function appendLog(item) {
  var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
  log.appendChild(item);
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
  conn.send(alias+" >> "+msg.value);
  msg.value = "";
  return false;
};

if (window["WebSocket"]) {
  conn = new WebSocket("wss://wss.do.my.id/ws");
  conn.onclose = function (evt) {
    var item = document.createElement("div");
    item.innerHTML = "<b>Connection closed.</b>";
    appendLog(item);
  };
  conn.onmessage = function (evt) {
    var messages = evt.data.split('\n');
    for (var i = 0; i < messages.length; i++) {
      var item = document.createElement("div");
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