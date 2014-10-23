var HistoryTracker={
	
	a_tags_history:[],
	a_events_history:[],
	
	init:function(){
	},
	addTagToHistory:function($tag){
		HistoryTracker.a_tags_history.push($tag);
	},
	addEventToHistory:function($tag){
		HistoryTracker.a_events_history.push($tag);
	},
	printHistory:function(){
		console.log(HistoryTracker.a_tags_history);
	}
};