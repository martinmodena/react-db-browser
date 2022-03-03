
import {  useContext } from "react";
import BrowserContext from './BrowserContext';

// {
//     "name": "make_id",
//     "type": "lookup",
//     "typeAdditionalData":{
//         "columns":[
//             {
//                 "name" : "description",
//                 "type" : "string"
//             }
//         ]
//     }
// }

const ViewRowCellLookup = (props) => {

    const config = props.config;
    const id = props.value;
    const browserContext = useContext(BrowserContext);
    //console.log("browserContext =",browserContext);
    const lookupTableName = config.name.substring(0,config.name.length-3);

    if( !browserContext ||
        !browserContext.lookupTables ||
        !browserContext.lookupTables[lookupTableName]){
            console.log("browserContext.lookupTables=",browserContext.lookupTables);
            console.log("lookupTableName=",lookupTableName,"browserContext.lookupTables[lookupTableName]=",browserContext.lookupTables[lookupTableName]);
            //console.log("non c'è la tabella con nome",lookupTableName,"browser context = ",browserContext ,"props",props);
            return "todavia";
        } 
    const lookupTable = browserContext.lookupTables[lookupTableName];

    //console.log("lookupTable =",lookupTable[0]);

    const recordFound = lookupTable.find((record) => record.id === id );

    // if not gound 
    if(recordFound===undefined) return ""
    
    // if found
    if(! config.typeAdditionalData || 
       ! config.typeAdditionalData.columns)
    return "";

    console.log("config.typeAdditionalData ",config.typeAdditionalData);    

    return config.typeAdditionalData.columns.reduce((previousValue,column)=>{
        console.log("column " + column.name + "value" + recordFound[column.name]);
        if(column.type==="lookup"){
            return <>{previousValue} <ViewRowCellLookup config={column} value={recordFound[column.name]} /></>;
        } 
        else return previousValue + " " + recordFound[column.name];
       },"");

    return null;   
    //recordFound["description"];
    /*<ViewRowCellLookup config={column} value={recordFound[column.name]} />*/
};


export default ViewRowCellLookup;