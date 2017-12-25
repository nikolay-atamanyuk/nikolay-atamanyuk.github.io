
function ArrayDistinctByField(source, field){
	var obj = {};
	
	for (var i = 0; i < source.length; i++) {
		var str = source[i][field];
		obj[str] = true; 
	}

	return Object.keys(obj);
};

function ArrayFlatternByField(source, field){
	var obj = {};
	
	for (var i = 0; i < source.length; i++) {
		for(var j=0; j<source[i][field].length; j++){
			var str = source[i][field][j];
			obj[str] = true; 
		}
	}

	return Object.keys(obj);
}