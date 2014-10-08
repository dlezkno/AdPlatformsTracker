var ReportsAndAnalytics={
	
	a_ra:{},
	
	init:function(){
		//Constructor
	},
	getReportsAndAnalyticsObject:function($scode,$pageName,$server,$channel,
  	$pageType,$reportsuiteid,$props,$evars,$events,$products,$purchaseId,
  	$zip_code,$state,$campaign,$hier1){
  		
		if(
			$scode!=undefined &&
			$pageName!=undefined &&
			$server!=undefined &&
			$channel!=undefined &&
			$reportsuiteid!=undefined){
					
			if(String($scode).indexOf('http://') || String($scode).indexOf('https://')){
				var ra={};
				ra["props"]=$props;
				ra["evars"]=$evars;
				ra["pageType"]=$props;
				ra["events"]=$events;
				ra["reportSuiteID"]=$reportsuiteid;
				ra["campaign"]=DomUtils.getURLParam('cmpid');
				ra['scode']=$scode;	
				if($pageName!=undefined && String($pageName).length>1){
					ra['pageName']=$pageName;	
				}else{
					ra['pageName']=document.title;	
					console.log("The page name is undefned, so the document.title value will be taken");
				}
				
				if($server!=undefined && String($server).length>1){
					ra['server']=$server;	
				}else{
					ra['server']=window.location.host;
					console.log("The server is undefned, so the window.location.host value will be taken");
				}
				
				if($channel!=undefined && String($channel).length>1){
					ra['channel']=$channel;	
				}else{
					ra['channel']=ReportsAndAnalytics.getChannel(String(window.location));
					console.log("The channel is undefned, so the window.location value will be taken to process the channel");
				}
				
				if($pageType!=undefined && String($pageType)!="errorPage"){
					ra['channel']=$channel;	
				}else{
					ra['channel']='';
					console.log("The channel is undefned, an empty value is taken");
				}	
				
				ReportsAndAnalytics.a_ra=ra;
				DomUtils.loadScript($scode,ReportsAndAnalytics.scodeLibLoaded);
				
			}else{
				console.log("The s_code param must be an URL");
			}	
		}else{
			console.log("All fields are required");
		}
   },
   scodeLibLoaded:function(){
   	var s_code=ReportsAndAnalytics.a_ra.scode;
	s.pageName= ReportsAndAnalytics.a_ra.pageName;
	s.server=ReportsAndAnalytics.a_ra.server;
	s.channel=ReportsAndAnalytics.a_ra.channel;
	s.pageType=ReportsAndAnalytics.a_ra.pageType;
	
	for(var i=0;i<ReportsAndAnalytics.a_ra.props.length;i++){
		var prop='prop'+ReportsAndAnalytics.a_ra.props[i].index;
		s[prop]=ReportsAndAnalytics.a_ra.props[i].value;
	}
	for(var j=0;j<ReportsAndAnalytics.a_ra.evars.length;j++){
		var evar='eVar'+ReportsAndAnalytics.a_ra.evars[j].index;
		s[evar]=ReportsAndAnalytics.a_ra.evars[j].value;
	}	
	
	s.events=String(ReportsAndAnalytics.a_ra.events);
	
   },
   getChannel:function($url){
   	
   	var url=$url;
   	url=url.replace("index.html/","");
	url=url.replace("index.php/","");
	url=url.replace("item/","");
	url=url.replace("node/#","");
	url=url.replace("#decano","");
	url=url.replace("#trabajo","");
	url=url.replace("/#","");
	url=url.replace(".php/#","");
	url=url.replace(".php#","");
	url=url.replace(".php","");		
	url=url.replace(".html/#","");
	url=url.replace(".html#","");		
	url=url.replace(".html","");	
	url=url.replace("http://","");
	url=url.replace("https://","");
	url=url.replace(window.location.hostname+"/","home|");

   	url=url.split("");
   	for(var i=0;i<url.length;i++){
   		if(url[i]=="/"){
    		url[i]="|";
   		}
   	}   		
   		
   	return url.join(""); 
   }
};