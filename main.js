
(function(data){

	var self=this;
	var vm=ko.mapping.fromJS(data);
	
	ko.applyBindings(vm, document.getElementById("sectionsList"))
})(data);