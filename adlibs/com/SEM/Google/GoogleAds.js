/** 
  * @desc This file definess all the functionality to dispatch Google AdWords Tags
  * @author Michael Avilán michael.avilan@gmail.com
  * @required proxy.php
*/


var GoogleAds={
	init:function(){
		//Constructor
	},
	googleAdWordsIframeConversionTracker:function(){
		var iframe='PHP/GARenderer.php?'+
	  	'goo'+'gle_conversion_id='+$conversion_id+
	  	'&goo'+'gle_conversion_language='+$language+
	  	'&goo'+'gle_conversion_format='+$conversion_format+
	  	'&goo'+'gle_conversion_color='+$color+
	  	'&goo'+'gle_conversion_label='+$label_id+
	  	'&goo'+'gle_conversion_value=1.00&google_conversion_currency=USD&google_remarketing_only=false';
	  	DomUtils.createIframe(iframe,1,1,1,"none");
		EventBus.dispatch(AdPlatformsController.GOOGLE_ADWORDS_DISPATCHED_EVENT);
	},
	doubleClickTagDispatcher:function($src,$cat){
		DomUtils.createBeacon('http://ad.doubleclick.net/activity;src='+$src+';type=invmedia;cat='+$cat+';ord=1?',1,1);
		EventBus.dispatch(AdPlatformsController.DOUBLE_CLICK_DISPATCHED_EVENT);
	},
	doubleClickDSPTagDispatcher:function($id,$cat,$type){
	  	var axel = Math.random() + "";
		var a = axel * 10000000000000;
	  	DomUtils.createIframe(
	  		'https://'+$id+'.fls.doubleclick.net/activityi;src='+$id+';type='+$type+';cat='+$cat+';ord=' + a + '?',
	  		1,1,1,"none");
	  	EventBus.dispatch(AdPlatformsController.DOUBLE_CLICK_DSP_DISPATCHED_EVENT);
  	}
};