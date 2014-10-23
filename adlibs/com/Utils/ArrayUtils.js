var ArrayUtils={
	init:function(){
	},
	 deleteDuplicates:function(ar){
		  var ya=false,v="",aux=[].concat(ar),r=Array(); 
		      for (var i in aux){ // 
		          v=aux[i]; 
		          ya=false; 
		          for (var a in aux){ 
		             if (v==aux[a]){ 
		                  if (ya==false){ 
		                      ya=true; 
		                  } 
		                  else{ 
		                      aux[a]=""; 
		                  } 
		              } 
		          } 
		      } 
		      for (var a in aux){ 
		          if (aux[a]!=""){ 
		              r.push(aux[a]); 
		          } 
		      } 
		      return r; 
	},
};