const extractLookUpTable = (jsonObject) =>{
	//console.log("at beginning",jsonObject);
    let tableList = [];
    if(jsonObject
    	&& isIterable(jsonObject) 
    	&& jsonObject.type 
        && jsonObject.type==="lookup" 
        && jsonObject.name 
        && jsonObject.name.endsWith("_id")){
        
          const tableName = jsonObject.name.substring(0,jsonObject.name.length - 3);
          tableList = [...tableList, tableName];
    }   
    
    if(isArray(jsonObject)){
      for (const item of jsonObject) {
      	  //console.log("ciclando array",item); 	
          if(isIterable(item))
          tableList = [...tableList,...extractLookUpTable(item)];
      }  
    }
    else if(isObject(jsonObject)){
      for (const key in jsonObject) {
          //console.log("ciclando oggetto",jsonObject[key]); 	
          if (jsonObject.hasOwnProperty(key) && isIterable(jsonObject[key])) {
              tableList = [...tableList,...extractLookUpTable(jsonObject[key])];
          }
       }  
    }
    
    return tableList;
}

export default extractLookUpTable;


//const items = {varA:"ciao"};
//const items = ["ciao"];
//const items = "a";

//console.log("isIterable(variable)=",isIterable(items));

const isArray = function (a) {
    return Array.isArray(a);
};

const isObject = function (o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

function isIterable(variable) {
    return isArray(variable) || isObject(variable);
}
