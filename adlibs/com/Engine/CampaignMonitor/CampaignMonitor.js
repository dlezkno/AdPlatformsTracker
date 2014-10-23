/** 
  * @desc This file defines all the rules to track the users behavior  during 
  * @author Michael Avilán michael.avilan@gmail.com
*/
var CampaignMonitor={
	
	a_campaign_var:'cmpid',
	
	init:function(){
		//Constructor
		CampaignMonitor.addListeners();
	},
	addListeners:function(){
		EventBus.addEventListener(AdPlatformsController.LIBRARIES_LOADED_EVENT,CampaignMonitor.checkCookie);
	},
	setCampaignVariable:function(){
		CampaignMonitor.a_campaign_var=Config.a_ck_name;
	},
	createCookie:function($cname, $cvalue, $exdays){
		var d = new Date();
		$cvalue=JSON.stringify($cvalue);
	    d.setTime(d.getTime() + ($exdays*24*60*60*1000));
	    var expires = 'expires='+d.toUTCString();
	    document.cookie = $cname + '=' + $cvalue + '; ' + expires;
	},
	getCookie:function($cname){
		var name = $cname + '=';
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	    }
	    return '';
	},
	checkCookie:function(){
		var ck = CampaignMonitor.getCookie(Config.a_ck_name);
		if(ck!=''){
			var ck=JSON.parse(ck);
			
			if(ck.campaigns!=undefined){
				ck.campaigns.push(CampaignMonitor.getCampaignObject());	
			}else{
				ck={campaigns:[]};
				ck.campaigns.push(CampaignMonitor.getCampaignObject());
			}
			CampaignMonitor.createCookie(Config.a_ck_name,
				CampaignMonitor.getCookieObject(ck.campaigns),30);
		}else{
			CampaignMonitor.createCookie(Config.a_ck_name,
				CampaignMonitor.getCookieObject([
					CampaignMonitor.getCampaignObject()
					]),
				30);
		}
	},
	getCampaignObject:function(){
		var cmp={};
		if(DomUtils.getURLParam(CampaignMonitor.a_campaign_var)!=null){
			cmp={
			cmpid:DomUtils.getURLParam(CampaignMonitor.a_campaign_var),
			date:CampaignMonitor.getFormatedDate(),
			url:document.location.href
			};
		}else{
			cmp={
			cmpid:'Organic',
			date:CampaignMonitor.getFormatedDate(),
			url:document.location.href
			};
		}
		return cmp;
	},
	getCookieObject:function($campaigns){
		var obj={campaigns:$campaigns};
		return obj;
	},
	getFormatedDate:function(){
		var d=new Date();
		return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
	},
	getCRMValues:function(){
		return {
			MEDIO:CampaignMonitor.setCampaignAndDetail().medio,
			DETALLEMEDIO:CampaignMonitor.setCampaignAndDetail().detalle_medio,
			DESCRIPCION:CampaignMonitor.setCampaignAndDetail().descripcion
		};
	},
	setCampaignAndDetail:function(){
		
		var campaigns=JSON.parse(CampaignMonitor.getCookie(Config.a_ck_name)).campaigns;
		var $param=campaigns[campaigns.length-1].cmpid;
		var campana='';
		var medio='';
		var tipoAnuncio='';
		var modalidad='';
		var tracking_code=$param.split('');
		var _counter=0;

		if($param!='Organic'){
			for(var i=0;i<tracking_code.length;i++){
				if(tracking_code[i]=='_'){ 
					_counter++; 
				}else{ 
					if(_counter<1){ 
						campana+=tracking_code[i]; 
					} 
					if(_counter>=1 && _counter<2){ 
						medio+=tracking_code[i]; 
					} 
					if(_counter>=2 && _counter<3){ 
						modalidad+=tracking_code[i]; 
					} 
					if(_counter>=3 && _counter<4){ 
						tipoanuncio+=tracking_code[i]; 
					} 
				} 
			} 
			
				var response={ 
					tracking_code:tracking_code.join(''), 
					medio:medio, 
					modalidad:tipoanuncio, 
					detalle_medio:modalidad,
					descripcion:''
				}; 
			}else{ 
				var response={ 
					tracking_code:'Organic', 
					medio:'Organic', 
					modalidad:'Organic', 
					detalle_medio:'Organic',
					descripcion:''
				}; 
			} 
			
			return response;
			
	},
	deleteCookie:function(){
		CampaignMonitor.createCookie(Config.a_ck_name,'',-1);
	}
}; 
CampaignMonitor.init();