var HistoryTracker={
	
	a_tags_history:[],
	
	init:function(){
	},
	addTagToHistory:function($tag){
		HistoryTracker.a_tags_history.push($tag);
	},
	printHistory:function(){
		console.log(HistoryTracker.a_tags_history);
	}
};