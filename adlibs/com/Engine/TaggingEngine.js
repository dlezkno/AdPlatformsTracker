/** 
  * @desc This file contains the Tagging Engine logic
  * @author Michael Avilán michael.avilan@gmail.com
*/
var TaggingEngine={
	
	a_config_engine:{url:'',origin:'',condition:'',landing:''},
	a_GA_centinela:false,
	a_RA_centinela:false,
	
	init:function(){
		//Constructor
	},
	activateDynamicEventsTagging:function($GA,$RA){
		TaggingEngine.a_GA_centinela=$GA;
		TaggingEngine.a_RA_centinela=$RA;
		var items = document.getElementsByTagName("a");
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
		    if(item.innerText.length>0){	    	
		    	item.addEventListener("click", TaggingEngine.clickHandler);
		    }
		}
	},
	clickHandler:function(e){
		if(TaggingEngine.a_GA_centinela==true){
			GAnalytics.dispatchEvent(String(document.title).toUpperCase(),'CLICK',e.srcElement.innerText);	
		}
	},
	loadByRemoteScript:function($url,$landing,$condition,$origin){
		if($url!=TaggingEngine.a_config_engine.url){
			TaggingEngine.a_config_engine={
				url:$url,
				origin:$origin,
				condition:$condition,
				landing:$landing
			};
		}
		
		DomUtils.loadScript($url,TaggingEngine.remoteFileLoaded);
	},
	remoteFileLoaded:function(){
		TagsModel.a_tags=a_remote_tags;
		TaggingEngine.dispatchTagsDelegate(
			TaggingEngine.a_config_engine.origin,
			TaggingEngine.a_config_engine.condition,
			TaggingEngine.a_config_engine.landing);
	},
	dispatchTagsDelegate:function($origin,$condition,$landing){
		for(var i=0;i<TagsModel.a_tags.length;i++){
			if(TagsModel.a_tags[i].landing==$landing){
				if(TagsModel.a_tags[i].dispatchAt==$condition){
					if(TagsModel.a_tags[i].byOrigin==true){
						if(TagsModel.a_tags[i].origin==$origin){
							TaggingEngine.dispatchTags(TagsModel.a_tags[i]);
						}
					}	
				}	
			}
		}	
		HistoryTracker.printHistory();
	},
	dispatchTags:function($tag){
		var type=$tag.a_type;
		HistoryTracker.addTagToHistory($tag);
		switch(type){
			case "GoogleAdWords":
			GoogleAds.googleAdWordsIframeConversionTracker($tag.config.id,$tag.config.language,$tag.config.format,$tag.config.color,$tag.config.label);
			break;
			case"DoubleClick":
			GoogleAds.doubleClickTagDispatcher($tag.config.src,$tag.config.cat);
			break;
			case"DoubleClickDSP":
			GoogleAds.doubleClickDSPTagDispatcher($tag.config.id,$tag.config.cat,$tag.config.type);
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
			SizmekAds.mediaMindSalesTagDispatcher($tag.config.id,$tag.config.orderID,$tag.config.productID,$tag.config.productInfo,$tag.config.quantity);
			break;
			case "SoicosTag":
			SoicosAds.soicosTagDispatcher($tag.config.id);
			break;
			case "YahooTag":
			YahooAds.yahooConversionTagDispatcher($tag.config.id);
			break;
			default:
			console.log('The requested tag doen not exist in the API');
		}
	}
};