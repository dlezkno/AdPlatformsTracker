/** 
  * @desc This file loads all the API libs 
  * @author Michael Avilán michael.avilan@gmail.com
  * @required proxy.php
*/

var AdPlatformsTracker={
	
	a_config_ob:{
		libs:[
			'com/Includes/jquery.min.js',
			'com/Config.js',
			'com/Utils/CSVReader.js',
			'com/Utils/XMLReader.js',
			'com/Control/AdPlatformsController.js',
			'com/SEM/Google/GoogleAds.js',
			'com/SEM/Facebook/FacebookAds.js',
			'com/SEM/Sizmek/SizmekAds.js',
			'com/SEM/Yahoo/YahooAds.js',
			'com/SEM/Soicos/SoicosAds.js',
			'com/Analytics/Adobe/ReportsAndAnalytics.js',
			'com/Analytics/Google/GAnalytics.js',
			'EventBus/EventBus.js',
			'com/Models/TagsModel.js',
			'com/Models/HistoryTracker.js',
			'com/Engine/TaggingEngine.js',
			'com/Engine/CampaignMonitor/CampaignMonitor.js',
		],
		libsloaded:0
	},
	init:function(){
		 if ( typeof window.jQuery === "undefined" ) {
		 	DomUtils.loadScript(AdPlatformsTracker.a_config_ob.libs[AdPlatformsTracker.a_config_ob.libsloaded],AdPlatformsTracker.libLoaded);	
		 }else{
		 	AdPlatformsTracker.a_config_ob.libsloaded++;
		 	DomUtils.loadScript(AdPlatformsTracker.a_config_ob.libs[AdPlatformsTracker.a_config_ob.libsloaded],AdPlatformsTracker.libLoaded);
		 }
	},
	libLoaded:function(){
		if(AdPlatformsTracker.a_config_ob.libsloaded<AdPlatformsTracker.a_config_ob.libs.length-1){
			AdPlatformsTracker.a_config_ob.libsloaded++;
			DomUtils.loadScript(AdPlatformsTracker.a_config_ob.libs[AdPlatformsTracker.a_config_ob.libsloaded],AdPlatformsTracker.libLoaded);
		}else{
			$.noConflict();
			EventBus.dispatch(AdPlatformsController.LIBRARIES_LOADED_EVENT);
		}
	}
};