var XMLReader={
	init:function(){
	},
	loadXML:function($path){
		 $.ajax({
		    type: "GET" ,
		    url: $path,
		    dataType: "xml" ,
		    success: function(xml) {
		    	console.log(xml);
		    	var xmlDoc = $.parseXML( xml );
		    	console.log(xmlDoc);	
		    }});
	}
};