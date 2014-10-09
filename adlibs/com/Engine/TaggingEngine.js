/** 
  * @desc This file contains the Tagging Engine logic
  * @author Michael Avilán michael.avilan@gmail.com
*/
var TaggingEngine={
	init:function(){
		//Constructor
	},
	dispatchTagsDelegate:function($byOrigin,$origin,$condition){
		for(var i=0;i<TagsModel.a_tags.length;i++){
			if(
				TagsModel.a_tags[i].byOrigin==$byOrigin &&
				TagsModel.a_tags[i].origin==$origin &&
				TagsModel.a_tags[i].dispatchAt==$condition &&
				TagsModel.a_tags[i].landing==$landing){
				
			}
		}		
	},
	dispatchTags:function($tag){
		var type=$tag.a_type;
		switch(type){
			case "GoogleAdWords":
			GoogleAds.googleAdWordsIframeConversionTracker($tag.config.id,$tag.config.language,$tag.config.format,$tag.config.color,$tag.config.label);
			break;
			case"GoogleClickTag":
			GoogleAds.doubleClickTagDispatcher($tag.config.src,$tag.config.cat);
			break;
			case"DoubleClick":
			GoogleAds.doubleClickDSPTagDispatcher($tag.config.id,tag.config.cat,tag.config.type);
			break;
			case "FacebookClassicTag":
			FacebookAds.facebookClassicTagDispatcher($tag.config.id,$tag.config.paramValue,$tag.config.currency);
			break;
			case "FacebookAudienceTag":
			FacebookAds.facebookAudienceTagDispatcher($tag.config.id);
			break;
			case "MediaMind":
			SizmekAds.mediaMindCounterTagDispatcher($tag.config.id);
			break;
			case "MediaMindRemarketing":
			SizmekAds.mediaMindRetargetingTagDispatcher($tag.config.tid,$tag.config.tval);
			break;
			case "MediaMindSales":
			break;
			case "SoicosTag":
			break;
			case "YahooTag":
			break;
		}
	}
};