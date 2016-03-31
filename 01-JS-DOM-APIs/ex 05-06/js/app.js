function fadein(){
	const el = document.getElementById("hworld");
	el.style.visibility = "visible";
	el.style.opacity = 1;
}

function createRequest(method, url) {
  var request = new XMLHttpRequest();
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

function tellJoke() {
  var url = 'http://api.icndb.com/jokes/random';
  const request = createRequest('GET', url);
  if (!request) {
    console.log('Could not create XMLHttpRequest');
    return;
  }

  request.onload = function() {
    const text = JSON.parse(request.responseText);
  	const element = document.getElementById("jokeSection") ;
  	if(text.type == "success"){
	  	element.innerHTML = text.value.joke;  		
  	} else {
      element.innerHTML = "Sorry, I forgot the joke"
    }
  };

  request.onerror = function() {
    alert('Error making request.');
  };

  request.send();
}
