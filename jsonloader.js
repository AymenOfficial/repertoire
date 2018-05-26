function loadJSON(callback, PATH_TO_JSON) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', PATH_TO_JSON , true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

// Call with callback as parameter
loadJSON(function(response) {
	// OBJECT - iterable
    response = JSON.parse(response);
}, PATH_TO_DATA);