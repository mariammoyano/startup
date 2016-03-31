function fadein(){
	const el = document.getElementById("hworld");
	el.style.visibility = "visible";
	el.style.opacity = 1;
}

function changeColor(element, color){
  element.style.color = color;
}

function createRequest(method, url) {
  const request = new XMLHttpRequest();
  if("withCredentials" in request) {
    request.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    request = new XDomainRequest();
    request.open(method, url);
  } else {
    request = null;
  }
  return request;
}

function makeAJAXcall(confObject){
  return new Promise(function(resolve, reject){
      const request = createRequest(confObject.method || 'GET', confObject.url);
      if (!request) {
        console.log('Could not create XMLHttpRequest');
        return;
      }

      request.onload = function(){
        if(confObject.element != undefined){
          changeColor(confObject.element, "");
        }
        resolve(request);
      }
      request.onerror = function(){
        if(confObject.element != undefined){
          changeColor(confObject.element, "red");
        }
        reject('Could not load data from ' + '\"' + confObject.url + '\"' );
      }
      request.send();
  })
}

function tellJoke(url) {
  const element = document.getElementById("jokeSection") ;
  const promise = makeAJAXcall({method:'GET',url:url,element:element});
  promise.then(
    function(succesReq){
      const text = JSON.parse(succesReq.responseText);
      if(text.type == "success"){
        element.innerHTML = text.value.joke;      
      } else {
        element.innerHTML = "Sorry, I forgot the joke"
      }
    }, 
    function(errorMsg){
      element.innerHTML = errorMsg;
    });
}