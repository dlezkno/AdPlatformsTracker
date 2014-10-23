/** 
  * @desc This file definess all the events that rules the API
  * @author Michael Avilán michael.avilan@gmail.com
*/
var Config={
		
	a_main_parser_path:'',
	a_asp_path:'',
	a_php_path:'',
	a_cfs_path:'',
	a_ck_name:'adlibs_ck',
	a_geo_data:{
		csv_sources:[
			'com/Utils/Geo/csv/2014-1-SubdivisionCodes.csv',
			'com/Utils/Geo/csv/2014-1-UNLOCODE-CodeListPart1.csv',
			'com/Utils/Geo/csv/2014-1-UNLOCODE-CodeListPart2.csv',
			'com/Utils/Geo/csv/2014-1-UNLOCODE-CodeListPart3.csv'
		]
	},
	
	
	init:function(){
	},
	setParserPath:function($case){
		switch($case){
			case 'php':
			Config.a_main_parser_path=a_php_path;
			break;
			case 'asp':
			Config.a_main_parser_path=a_asp_path;
			break;
			case 'cf':
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