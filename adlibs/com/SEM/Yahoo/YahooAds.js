/** 
  * @desc This file definess all the events that rules the API
  * @author Michael Avilán michael.avilan@gmail.com
*/

var YahooAds={
	init:function(){
		//Constructor
	},
	yahooConversionTagDispatcher:function($pixelId){
		DomUtils.createBeacSon('http://ads.yahoo.com/pixel?id='+$pixelId+'&t=2',1,1);
	},
    getYahooTagObject:function($id,$origin,$condition,$landing){
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
