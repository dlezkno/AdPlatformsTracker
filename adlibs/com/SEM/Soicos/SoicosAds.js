/** 
  * @desc This file dispatchs the Soicos tags
  * @author Michael Avilán michael.avilan@gmail.com
*/

var SoicosAds={
	
	a_soicos_pid:'',
	
	init:function(){
	},
	soicosTagDispatcher:function($pid){
	  	SoicosAds.a_soicos_pid=$pid;
		DomUtils.loadScript("http://ad.soicos.com/soicosjs.php?s=.js",
		SoicosAds.soicosCallback);
	},
	soicosCallback:function(){
		soicos.registerConversion({ pid :SoicosAds.a_soicos_pid, data : '' });
		EventBus.dispatch(AdPlatformsController.SOICOS_TAG_DISPATCHER);
	},
	soicosImageTagDispatcher:function($pid){
		DomUtils.createBeacon('http://ad.soicos.com/conv.php?pid='+$pid,1,1);
		EventBus.dispatch(AdPlatformsController.SOICOS_IMAGE_TAG_DISPATCHER);
	},
    getSoicosTagObject:function($id,$origin,$condition,$landing){
		return {
			a_type:"SoicosTag", 
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