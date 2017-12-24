
function ArrayDistinct(source, field){
	var obj = {};
	
	for (var i = 0; i < source.length; i++) {
		var str = source[i][field];
		obj[str] = true; 
	}

	return Object.keys(obj);
};
