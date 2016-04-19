function Output(msg) {
	document.getElementById("filedrag").value = msg;
}

if (window.FileList && window.FileReader) {
	Init();
}

function Init() {
	let filedrag = document.getElementById("filedrag");
	let textarea = document.getElementById("textInput");

	filedrag.addEventListener("dragover", FileDragHover, false);
	filedrag.addEventListener("dragleave", FileDragHover, false);
	filedrag.addEventListener("drop", FileSelectHandler, false);
	filedrag.style.display = "block";
	textarea.style.display = "none";
}

function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function FileSelectHandler(e) {
	FileDragHover(e);

	let files = e.dataTransfer.files;

	for (let i = 0, f; f = files[i]; i++) {
		ParseFile(f);
	}
}

function ParseFile(file) {
	
	if (file.type.indexOf("text") == 0) {
		var reader = new FileReader();
		reader.onload = function(e) {
			Output(
				e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;")
			);
		}
		reader.readAsText(file);
	}
}