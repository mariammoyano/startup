let output;
let websocket;

function init() {
  output = document.getElementById("msglog");
  initWebSocket();
}

function initWebSocket() {
  websocket = new WebSocket("ws://echo.websocket.org/");
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt) {
  writeToScreen("CONNECTED");
  enableSend(true);
}

function onClose(evt) {
  enableSend(false);
  writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
  writeToScreen('RESPONSE: ' + evt.data, 'response');
}

function onError(evt) {
  writeToScreen('ERROR: ' + evt.data, 'error');
}

function doSend(message) {
  writeToScreen("SENT: " + message, 'sent');
  websocket.send(message);
}

function writeToScreen(message, className) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.className = className;
  pre.innerHTML = message;
  output.appendChild(pre);
}

function enableSend(bool) {
  document.getElementById("sendbtn").disabled = !bool;
}
