
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
		
	self.dateAscSort=ko.observable(false);
	
	self.hasTags=ko.observable(false);
		
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
		self.buildFilters(self.source());
				
		self.sort();
	};
	
	self.buildFilters=function(source){
		if(!self.selectedName())
			self.names(self.getGroupedField(source, "name").sort());
		if(!self.selectedStage())
			self.stages(self.getGroupedField(source, "stage").sort());
		if(!self.selectedActor())
		self.actors(self.getGroupedActors(source).sort());
	};
	
	self.resetFilters=function(){
		self.selectedName(null);
		self.selectedStage(null);
		self.selectedActor(null);
		self.dateAscSort(true);
		self.hasTags(false);
		
		self.filter();
	};
	
	self.getGroupedField=function(source, field){
		
		var obj = {};
	
		for (var i = 0; i < source.length; i++) {
			var str = source[i][field]();
			obj[str] = true; 
		}

		return Object.keys(obj);		
	};	
	
	self.getGroupedActors=function(source){
		var obj = {};
	
		for (var i = 0; i < source.length; i++) {
			var koMembers = source[i].members;
			if(koMembers){
				var members=koMembers();
				for(var j=0; j<members.length; j++)
					obj[members[j].actor()]=true;								
			}				
		}

		return Object.keys(obj);
	};	
	
	self.invertSort=function(){
		self.dateAscSort(!self.dateAscSort());
		
		self.sort();
	};
	
	self.invertTags=function(){
		self.hasTags(!self.hasTags());
		
		self.filter();
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
		var rez= self.selectedName() || self.selectedStage() || self.selectedActor() || self.hasTags()
				? ko.utils.arrayFilter(self.source(), function(item) {
					return (!self.selectedName() || self.selectedName()==item.name())
						&& (!self.selectedStage() || self.selectedStage()==item.stage())
						&& (!self.selectedActor() || (item.members && ko.utils.arrayFirst(item.members(), function(member){ return member.actor()===self.selectedActor()})))
						&& (!self.hasTags() || (self.hasTags() && item.tags))				
						;			
					})
				: self.source();
		
		self.buildFilters(rez);
		
		self.concerts(rez);
		self.sort();
	};
		
};