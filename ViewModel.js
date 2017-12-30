
function ViewModel(){
	var self=this;
	
	self.source=ko.observableArray([]);
	
	self.concerts=ko.observableArray([]);
	self.names=ko.observableArray([]);
	self.selectedName=ko.observable();
	self.stages=ko.observableArray([]);
	self.selectedStage=ko.observable();
	self.actors=ko.observableArray([]);
	self.selectedActor=ko.observable();
		
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
	
	self.selectedActor.subscribe(function(){
		self.filter();
	});
		
		
	self.init=function(data){
		self.source=ko.mapping.fromJS(data);;
				
		self.concerts=ko.mapping.fromJS(data);
		self.buildFilters(data);
				
		self.sort();
	};
	
	self.buildFilters=function(source){
		self.names=ko.mapping.fromJS(self.getGroupedField(source, "name").sort());
		self.stages=ko.mapping.fromJS(self.getGroupedField(source, "stage").sort());
		self.actors=ko.mapping.fromJS(self.getGroupedActors(source).sort());
	};
	
	self.getGroupedField=function(source, field){
		
		var obj = {};
	
		for (var i = 0; i < source.length; i++) {
			var str = source[i][field];
			obj[str] = true; 
		}

		return Object.keys(obj);		
	};
	
	
	self.getGroupedActors=function(source){
		var obj = {};
	
		for (var i = 0; i < source.length; i++) {
			var members = source[i].members;
			if(members)
				for(var j=0; j<members.length; j++)
					obj[members[j].actor]=true;								
		}

		return Object.keys(obj);
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
		var rez= self.selectedName() || self.selectedStage() || self.selectedActor()
		? ko.utils.arrayFilter(self.source(), function(item) {
			return (!self.selectedName() || self.selectedName()==item.name())
				&& (!self.selectedStage() || self.selectedStage()==item.stage())
				&& (!self.selectedActor() || (item.members && ko.utils.arrayFirst(item.members(), function(member){ return member.actor()===self.selectedActor()})))
				;			
		})
		: self.source();
		
		self.buildFilters(rez);
		
		self.concerts(rez);
		self.sort();
	};
		
};