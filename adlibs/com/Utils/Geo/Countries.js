var Countries={
	
	a_loaded_data:{subdivision:[],data:[]},

	a_disclaimer:{
		source:'UNECE',
		date:'21/10/2014',
		URL:'http://www.unece.org/cefact/codesfortrade/codes_index.html'
	},
	a_sources:[],
	a_counter:0,
	
	init:function(){
		Countries.a_sources=Config.a_geo_data.csv_sources;
		Countries.loadDataSources();
	},
	loadDataSources:function(){
		CSVReader.loadCSV(Countries.a_sources[0],Countries.dataLoaded);
	},
	dataLoaded:function(){
		if(Countries.a_counter<Countries.a_sources.length){
			var item={source:Countries.a_sources[Countries.a_counter],data:CSVReader.a_data};
			
			if(Countries.a_counter==0){
				Countries.a_loaded_data.subdivision.push(item);
			}else{
				Countries.a_loaded_data.data.push(item);
			}
			
			Countries.a_counter++;
			CSVReader.loadCSV(Countries.a_sources[Countries.a_counter],Countries.dataLoaded);
		}else{
			Countries.loadCountriesFromXML();
		}
		
	},
	loadCountriesFromXML:function(){
		XMLReader.loadXML('com/Utils/Geo/xml/countries.xml');
	},
	consolidateData:function(){
		var codes=[];
		for(var i=0;i<Countries.a_loaded_data.subdivision[0].data.length;i++){
			codes.push(Countries.a_loaded_data.subdivision[0].data[i][0]);			
		}
		
		codes=ArrayUtils.deleteDuplicates(codes);
		console.log(codes);
		var items=[];
		
		for(var j=0;j<codes.length;j++){
			for(var k=0;k<Countries.a_loaded_data.data.length;k++){
				for(var l=0;l<Countries.a_loaded_data.data[k].data.length;l++){
					for(var m=0;m<Countries.a_loaded_data.data[k].data[l].length;m++){
						if(codes[j]==Countries.a_loaded_data.data[k].data[l][m]){
							var item={code_country:codes[j]};
							item['name_country']=Countries.a_loaded_data.data[k].data[l][2];
							codes[j]=item;
							//items.push(item);
						}	
					}
				}
		  	}
	    //console.log(ArrayUtils.deleteDuplicates(codes));
		}
		console.log(Countries.a_loaded_data);
	    console.log(codes);
	}
};