var Main={
	
	a_leads:[],
	a_matriculados:[],
	a_consolidated:[],
	
	init:function(){
		$( document ).ready(function() {
		   //CSVReader.loadCSV('data/leads.csv',Main.leadsComplete);
		});
	},
	leadsComplete:function(){
		Main.a_leads=CSVReader.a_tags_definition;
		var _leads=[];
		for(var i=0;i<Main.a_leads.length;i++){
			var item={
				mail:Main.a_leads[i][0].split(";")[0],
				fecha:Main.a_leads[i][0].split(";")[1],
				tipo:Main.a_leads[i][0].split(";")[2],
				carrera:Main.a_leads[i][0].split(";")[3],
				estado:Main.a_leads[i][0].split(";")[4],
				autor:Main.a_leads[i][0].split(";")[5],
				origen:Main.a_leads[i][0].split(";")[11]
			};
			_leads.push(item);
		}
		Main.a_leads.length=0;
		Main.a_leads=_leads;
		CSVReader.loadCSV('data/matriculados.csv',Main.matriculadosComplete);
	},
	matriculadosComplete:function(){
		var _matriculados=[];
		Main.a_matriculados=CSVReader.a_tags_definition;
		for(var i=0;i<Main.a_matriculados.length;i++){
			var item={
				nombre:Main.a_matriculados[i][0].split(";")[0],
				mail:Main.a_matriculados[i][0].split(";")[1],
				nombre2:Main.a_matriculados[i][0].split(";")[2],
				carrera:Main.a_matriculados[i][0].split(";")[3],
				clase:Main.a_matriculados[i][0].split(";")[4],
				estadoLegajo:Main.a_matriculados[i][0].split(";")[5],
				fechaIngreso:Main.a_matriculados[i][0].split(";")[6]
			};
			_matriculados.push(item);
		}
		Main.a_matriculados.length=0;
		Main.a_matriculados=_matriculados;
		Main.consolidateData();
	},
	consolidateData:function(){
		var consolidated=[];
		for(var i=0;i<Main.a_leads.length;i++){
			for(var j=0;j<Main.a_matriculados.length;j++){
				if(Main.a_leads[i].mail==Main.a_matriculados[j].mail){
					if(Main.a_leads[i].origen=='Facebook' || Main.a_leads[i].origen=='Adwords'){
						var item={
							mail:Main.a_leads[i].mail,
							nombre:Main.a_matriculados[j].nombre,
							tipo:Main.a_leads[i].tipo,
							carreraLead:Main.a_leads[i].carrera,
							carreraMatriculado:Main.a_matriculados[j].carrera,
							estado:Main.a_leads[i].estado,
							autor:Main.a_leads[i].autor,
							origen:Main.a_leads[i].origen,
							estadoLegajo:Main.a_matriculados[j].estadoLegajo,
							fechaIngreso:Main.a_matriculados[j].fechaIngreso,
							fecha:Main.a_leads[i].fecha
						};
						consolidated.push(item);
					}
				}
			}
		}
		Main.a_consolidated=consolidated;
		console.log( JSON.stringify(Main.a_consolidated) );
		Main.exportExcel();
	},
	exportExcel:function(){
		$.ajax({
		   	url: 'http://localhost/digilab/Dropbox/Server/001%20Hecho%20Para%20Liderar/hechoparaliderar/api/php/utils/FileDownloader2.php',
		   	data: { 
		        'service': 'cons',
		        data:JSON.stringify(Main.a_consolidated),
		        file:'consolidated'
		        },
		    type: 'post',
		    //dataType: 'json',
		    success: function (_data) {
		    	alert("Complete");
		    },
		    error: function (xhr, ajaxOptions, thrownError) {
		    	console.log("Error: "+thrownError+". Status: "+xhr.status);
		    }
		 });
	}
};
Main.init();
