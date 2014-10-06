/** 
  * @desc This file loads all the API libs 
  * @author Michael Avilán michael.avilan@gmail.com
  * @required proxy.php
*/

var AdPlatformsTracker={
	
	a_config_ob:{
		libs:[
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
			'com/config.js',
			'com/Utils/CSVReader.js',
			'com/Control/AdPlatformsController.js',
			'com/SEM/Google/GoogleAds.js',
			'com/SEM/Facebook/FacebookAds.js',
			'com/SEM/Sizmek/SizmekAds.js',
			'com/SEM/Yahoo/YahooAds.js',
			'com/SEM/Yahoo/SoicosAds.js',
			'com/Analytics/Adobe/ReportsAndAnalytics.js',
			'com/Analytics/Google/GAnalytics.js',
			'EventBus/EventBus.js',
			'Main.js'
		],
		libsloaded:0
	},
	init:function(){
		DomUtils.loadScript(AdPlatformsTracker.a_config_ob.libs[AdPlatformsTracker.a_config_ob.libsloaded],AdPlatformsTracker.libLoaded);
	},
	libLoaded:function(){
		if(AdPlatformsTracker.a_config_ob.libsloaded<AdPlatformsTracker.a_config_ob.libs.length-1){
			AdPlatformsTracker.a_config_ob.libsloaded++;
			DomUtils.loadScript(AdPlatformsTracker.a_config_ob.libs[AdPlatformsTracker.a_config_ob.libsloaded],AdPlatformsTracker.libLoaded);
		}else{
			EventBus.dispatch(AdPlatformsController.LIBRARIES_LOADED_EVENT);
		}
	}
};
AdPlatformsTracker.init();