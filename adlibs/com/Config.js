/** 
  * @desc This file definess all the events that rules the API
  * @author Michael Avilán michael.avilan@gmail.com
*/
var Config={
		
	a_main_parser_path:"",
	a_asp_path:"",
	a_php_path:"",
	a_cfs_path:"",
	
	
	init:function(){
	},
	setParserPath:function($case){
		switch($case){
			case "php":
			Config.a_main_parser_path=a_php_path;
			break;
			case "asp":
			Config.a_main_parser_path=a_asp_path;
			break;
			case "cf":
			Config.a_main_parser_path=a_cfs_path;
			ldfusion_path;
			break;
		}
	},
	setASPPath:function($url){
		Config.a_asp_path=$url;
	},
	setPHPPath:function($url){
		Config.a_php_path=$url;
	},
	setCFCPath:function($url){
		Config.a_cfs_path=$url;
	}
};