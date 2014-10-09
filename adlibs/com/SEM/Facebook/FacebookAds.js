/** 
  * @desc This file definess all the functionality to dispatch the Facebook tags
  * @author Michael Avilán michael.avilan@gmail.com
*/

var FacebookAds={
	init:function(){
		//Constructor
	},
	facebookClassicTagDispatcher:function($pixelId,$paramValue,$currency){
		var fb_param = {};
		fb_param.pixel_id = $pixelId;
		fb_param.value = $paramValue;
		fb_param.currency = $currency;
		var fpw = document.createElement('script');
		fpw.async = true;
		fpw.src = '//connect.facebook.net/en_US/fp.js';
		var ref = document.getElementsByTagName('script')[0];
		ref.parentNode.insertBefore(fpw, ref);
		DomUtils.createBeacon('https://www.facebook.com/offsite_event.php?id='+$pixelId+'&amp;value=0&amp;currency=USD',1,1);
		EventBus.dispatch(AdPlatformsController.FACEBOOK_CLASSICTAG_DISPATCHED_EVENT);
 },
  facebookAudienceTagDispatcher:function($addPixelId){
  	var _fbq = window._fbq || (window._fbq = []);
  	if (!_fbq.loaded) {
	    var fbds = document.createElement('script');
	    fbds.async = true;
	    fbds.src = '//connect.facebook.net/en_US/fbds.js';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(fbds, s);
	    _fbq.loaded = true;
	}
	 _fbq.push(['addPixelId', $addPixelId]);
	
	window._fbq = window._fbq || [];
	window._fbq.push(['track', 'PixelInitialized', {}]);
  	DomUtils.createBeacon('https://www.facebook.com/tr?id='+$addPixelId+'&amp;ev=NoScript',1,1);
  	EventBus.dispatch(AdPlatformsController.FACEBOOK_AUDIENCETAG_DISPATCHED_EVENT);
  },
  getFacebookClassicTagObject:function($id,$paramValue,$currency,$origin,$condition,$landing){
		return {
			a_type:"FacebookClassicTag", 
			byOrigin:true, 
			origin:$origin,
			dispatchAt:$condition, 
			landing:$landing,
			config:{
				id:$id, 
				paramValue:$paramValue,
				currency:$currency
			}
		};
  },
  getFacebookAudienceTagObject:function($id,$origin,$condition,$landing){
		return {
			a_type:"FacebookAudienceTag", 
			byOrigin:true, 
			origin:$origin,
			dispatchAt:$condition, 
			landing:$landing,
			config:{
				id:$id
			}
		};
	}
};