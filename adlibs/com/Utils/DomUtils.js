/** 
  * @desc This file is the bridge betwen the logic and the DOM container
  * @author Michael Avilán michael.avilan@gmail.com
*/

var DomUtils={
	init:function(){
		DomUtils.loadScript('AdPlatformsTracker.js',function(){
			AdPlatformsTracker.init();
		});
	},
	createBeacon:function($url,$w,$h){
	  	var noscript = document.createElement('noscript');
	  	var image = new Image($w,$h); 
		image.src = $url;
		try{
			$(this).parent().append(noscript);
			noscript.appendChild(image);
		}catch(e){
			var s=document.getElementsByTagName('script')[0]; 
		  	s.parentNode.insertBefore(noscript, s);
		  	noscript.appendChild(image);
		}finally{
		}
	},
	redirectToURL:function($url){
		document.location.href = $url;
		setTimeout(redirFunction, 1000);
	},
	createIframe:function($url,$w,$h,$fb,$d){
		var iframe=$url;
	  	var ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("src", iframe);
		ifrm.setAttribute("width", $w);
		ifrm.setAttribute("height", $h);
		ifrm.setAttribute("frameborder", $fb);
		ifrm.style.display = $d;
		document.body.appendChild(ifrm);
	},
	loadScript:function($url, $callback){
		var script = document.createElement("script");
	    script.type = "text/javascript";
	    	
	    if (script.readyState){
	        script.onreadystatechange = function(){
	            if (script.readyState == "loaded" ||
	                    script.readyState == "complete"){
	                script.onreadystatechange = null;
	                $callback();
	            }
	        };
	    } else {
	        script.onload = function(){
	           $callback();
	        };
	    }
	
	    script.src = $url;
	    document.getElementsByTagName("head")[0].appendChild(script);
	}
};
DomUtils.init();
