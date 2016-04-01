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
        if (this.status != 200 ) { this.onerror(); }    
        resolve(request);
      }
      request.onerror = function(){
        if(confObject.element != undefined){
          changeColor(confObject.element, "red");
        }
        let status = (this.status != 0) ? ' ' + this.status + ' (' + this.statusText + ')' : "";
        reject('Error' + status + '. Could not load data from ' + '\"' + confObject.url + '\"' );
      }
      request.send();
  })
}

function tellJoke(url) {
  const element = document.getElementById("jokeSection") ;
  const promise = makeAJAXcall({method:'GET',url:url,element:element});
  promise.then(
    function(successReq){
      const text = JSON.parse(successReq.responseText);
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

function searchRepos(elementID, query, outputType){
  if (query != '') {
    const url = 'https://api.github.com/search/repositories?q='+query;
    const element = document.getElementById(elementID);
    const title = document.createElement('h3');
    title.innerHTML = query + ' Repositories';

    const promise = makeAJAXcall({method:'GET',url:url,element:element});
    promise.then(
      function(successReq){
        element.innerHTML = "";
        element.appendChild(title);
        const response = JSON.parse(successReq.responseText);
        if(outputType === 'table'){
          element.appendChild(makeTable(response.items, ['name','full_name','owner','html_url','description']));        
        } else {
          element.appendChild(makeList(response.items));
        }
      }, 
      function(errorMsg){
        element.innerHTML = errorMsg;
      });    
  }
}

function makeList(array){
  const list = document.createElement('ul');
  for (let i = 0; i < array.length; i++) {
    appendNewLink(list, array[i]);
  }
  return list;
}

function appendNewLink(element, item){
  let listItem = document.createElement("li");
  let link = document.createElement("a");
  link.setAttribute('href', item.html_url);
  link.innerHTML = item.full_name;
  listItem.appendChild(link);
  element.appendChild(listItem);
}

function makeTable(matrix, fieldArray){
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  let tr = document.createElement('tr');
  const tbody = document.createElement('tbody');

  // Create Header
  // ********************************************************
  for (let i = 0; i < fieldArray.length; i++) {
    const th = document.createElement('th');
    const text = document.createTextNode(fieldArray[i]);
    
    th.appendChild(text);
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);

  // Create Body
  // ********************************************************
  for (var j = 0; j < matrix.length; j++) {
    // Create Row
    // ********************************************************
    tr = document.createElement('tr');
    for (let i = 0; i < fieldArray.length; i++) {
      let td = document.createElement('td');
      let content;
      let field = fieldArray[i];
      let linkInner;

      if(field === 'html_url' || field === 'owner'){
        content = document.createElement('a');

        if(field === 'html_url'){
          linkInner = document.createTextNode(matrix[j].name);
          content.setAttribute('href', matrix[j][field]);
        } else {
          linkInner = document.createTextNode(matrix[j][field].login);
          content.setAttribute('href', matrix[j][field].html_url);
        }
        content.appendChild(linkInner);

      } else {
        content = document.createTextNode(matrix[j][field]);
      }

      td.appendChild(content);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  return table;
}
