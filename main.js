

(function(data){
	var vm=new ViewModel();
	vm.init(data);
		
	ko.applyBindings(vm, document.getElementById("placeholder"))
})(data);

