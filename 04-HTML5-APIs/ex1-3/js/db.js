var db;

function setupDataBase(){
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (!window.indexedDB) {
    	window.alert("Your browser doesn't support a stable version of IndexedDB.");
	}

    // window.indexedDB.deleteDatabase("Topic5_DB");
    var request = window.indexedDB.open("Topic5_DB", 3);

    request.onerror = function(event) {
		console.log("Database request failed")
	};
	request.onsuccess = function(event) {
		console.log("DB successfully opened");
	  	db = event.target.result;
	};
	request.onupgradeneeded = function(event) { 
		console.log ("Updating DB");

		db = event.target.result;
		db.onerror = function(event) {
			console.log("Database error: " + event.target.errorCode);
		};
		if(db.objectStoreNames.contains("persistedData")) {
			db.deleteObjectStore("persistedData");
		}
		db.createObjectStore("persistedData", { keyPath: "key" });
	};

	updateStorageField('text1', persistedDataTxtArea);
}

function saveToLocalhost(key, value){
	window.localStorage.setItem(key, value);
}

function saveToIndexedDB(key, value){
	var request = db.transaction(["persistedData"], "readwrite")
        .objectStore("persistedData")
        .put({ key: key, value: value });
}

function retrieveFromLH(key) {
	return localStorage.getItem(key);
}

function retrieveFromIDB(key) {
	return new Promise(function(resolve, reject){
		let request = db.transaction(["persistedData"])
			.objectStore("persistedData")
			.get(key);


	    request.onsuccess = function(event) {
	      if(request.result) {
	      	resolve(request.result);
	      } else {
	      		let msg = `key: ${key} not found in your database!`;
	            console.log(msg); ;
	            resolve({value: ""});
	      }      
	    };

	    request.onerror = function(event) {
	      reject("Unable to retrieve data from database!");
	    };
		
	});
}

function removeFromLH(key) {
	localStorage.removeItem(key);
}
function removeFromIDB(key) { 
    let request = db.transaction(["persistedData"], "readwrite")
        .objectStore("persistedData")
        .delete(key);
    request.onsuccess = function(event) {
      console.log(`${key} entry has been removed from your database.`);
    };
}

function save(key,value){
	saveToLocalhost(key,value);
	saveToIndexedDB(key,value);

	updateStorageField('text1', persistedDataTxtArea);;
}

function clearData(key){
	removeFromLH(key);
	removeFromIDB(key);
	updateStorageField('text1', persistedDataTxtArea);
}

function updateStorageField(key, element){;
	let promise = retrieveFromIDB(key);
	promise.then(function(successReq){
		element.innerHTML = successReq.value;
		console.log(`Data retrieved from IndexedDB`);
	}, 
	function(errorMsg){
		console.log(`${errorMsg} Retrieving from localHost`);
		element.innerHTML = retrieveFromLH(key);
	});
}

setupDataBase();