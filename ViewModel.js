
function ViewModel(){
	var self=this;
	
	self.source=ko.observableArray([]);
	
	self.concerts=ko.observableArray([]);
	self.names=ko.observableArray([]);
	self.selectedName=ko.observable();
	self.stages=ko.observableArray([]);
	self.selectedStage=ko.observable();
	self.owners=ko.observableArray([]);
	self.selectedOwner=ko.observable();
	self.types=ko.observableArray([]);
	self.selectedType=ko.observable();
	
	self.dateAscSort=ko.observable(true);
	
	self.dateSorting = ko.computed(function() {
        return self.dateAscSort() ? "давно" : "недавно";
    });	
	
	self.selectedName.subscribe(function(){
		self.filter();
	});
	
	self.selectedStage.subscribe(function(){
		self.filter();
	});
	
	self.selectedType.subscribe(function(){
		self.filter();
	});
	
	self.selectedOwner.subscribe(function(){
		self.filter();
	});
		
	self.init=function(data){
		self.source=ko.mapping.fromJS(data);;
				
		self.concerts=ko.mapping.fromJS(data);
		self.names=ko.mapping.fromJS(ArrayDistinct(data, "name").sort());
		self.stages=ko.mapping.fromJS(ArrayDistinct(data, "stage").sort());
		self.owners=ko.mapping.fromJS(ArrayDistinct(data, "owner").sort());
		self.types=ko.mapping.fromJS(ArrayDistinct(data, "type").sort());
		
		self.sort();
	};
	
	self.invertSort=function(){
		self.dateAscSort(!self.dateAscSort());
		
		self.sort();
	};
		
	self.sort=function(){
		self.concerts.sort(function (left, right) { 
			if(self.dateAscSort())
				return left.date() == right.date() ? 0 : (left.date() < right.date() ? -1 : 1); 
			else
				return left.date() == right.date() ? 0 : (left.date() > right.date() ? -1 : 1); 
		});
	};
	
	self.filter=function(){
		var rez= self.selectedName() || self.selectedStage() || self.selectedOwner() || self.selectedType() 
		? ko.utils.arrayFilter(self.source(), function(item) {
			return (!self.selectedName() || self.selectedName()==item.name())
				&& (!self.selectedStage() || self.selectedStage()==item.stage())
				&& (!self.selectedOwner() || self.selectedOwner()==item.owner())
				&& (!self.selectedType() || self.selectedType()==item.type());			
		})
		: self.source();
		
		self.concerts(rez);
		self.sort();
	};
		
};