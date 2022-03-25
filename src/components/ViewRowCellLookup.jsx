
import { useContext } from "react";
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

// const ViewRowCellLookup = (props) => {

//     const config = props.config;
//     const id = props.value;
//     const browserContext = useContext(BrowserContext);
//     //console.log("browserContext =",browserContext);
//     const lookupTableName = config.name.substring(0,config.name.length-3);

//     if( !browserContext ||
//         !browserContext.lookupTables ||
//         !browserContext.lookupTables[lookupTableName]){
//             console.log("browserContext.lookupTables=",browserContext.lookupTables);
//             console.log("lookupTableName=",lookupTableName,"browserContext.lookupTables[lookupTableName]=",browserContext.lookupTables[lookupTableName]);
//             //console.log("non c'è la tabella con nome",lookupTableName,"browser context = ",browserContext ,"props",props);
//             return "todavia";
//         } 
//     const lookupTable = browserContext.lookupTables[lookupTableName];

//     //console.log("lookupTable =",lookupTable[0]);

//     const recordFound = lookupTable.find((record) => record.id === id );

//     // if not gound 
//     if(recordFound===undefined) return ""

//     // if found
//     if(! config.typeAdditionalData || 
//        ! config.typeAdditionalData.columns)
//     return "";

//     console.log("config.typeAdditionalData ",config.typeAdditionalData);    

//     return config.typeAdditionalData.columns.reduce((previousValue,column)=>{
//         console.log("column " + column.name + "value" + recordFound[column.name]);
//         if(column.type==="lookup"){
//             return <>{previousValue} <ViewRowCellLookup config={column} value={recordFound[column.name]} /></>;
//         } 
//         else return previousValue + " " + recordFound[column.name];
//        },"");



// };


const getLookupValues = (config, tables, id) => {

    // in config there is "car_id" we need "car"
    const lookupTableName = config.name.substring(0, config.name.length - 3);
    const table = tables[lookupTableName];

    //console.log("InputLookupconfig:table", table);

    let recordsToEvaluate = [];
    if (id) {
        const recordFound = table.find(record => record.id === id);
        if (!recordFound) { recordsToEvaluate.push({ value: id, label: "not found value" }) }
        else {
            recordsToEvaluate.push(recordFound);
        }

    }
    else {
        recordsToEvaluate = table;
    }

    const retValue = recordsToEvaluate.map((record) => {
        return config.typeAdditionalData.columns.reduce((previousValue, column) => {
            //console.log("column " + column.name + "value" + recordFound[column.name]);

            let description = "";
            let prevDescription = "";
            if (previousValue && previousValue.label) prevDescription = previousValue.label + " ";
            if (column.type === "lookup") {
                description = prevDescription + getLookupValues(column, tables, record[column.name])[0].label;
            }
            else description = prevDescription + record[column.name];

            //console.log("lookupValue=", { id: record.id, description });

            return { value: record.id, label: description };

        }, "");
    }
    );

    //console.log("lookupValue:retValue", retValue);
    return retValue;

}

const ViewRowCellLookup = (props) => {

    const config = props.config;
    const id = props.value;
    const browserContext = useContext(BrowserContext);
    //console.log("browserContext =",browserContext);
    const lookupTableName = config.name.substring(0, config.name.length - 3);

    if (!browserContext ||
        !browserContext.lookupTables ||
        !browserContext.lookupTables[lookupTableName]) {
        console.log("browserContext.lookupTables=", browserContext.lookupTables);
        console.log("lookupTableName=", lookupTableName, "browserContext.lookupTables[lookupTableName]=", browserContext.lookupTables[lookupTableName]);
        //console.log("non c'è la tabella con nome",lookupTableName,"browser context = ",browserContext ,"props",props);
        return "todavia";
    }
    const lookupTable = browserContext.lookupTables[lookupTableName];

    //console.log("lookupTable =",lookupTable[0]);

    const recordFound = lookupTable.find((record) => record.id === id);

    // if not gound 
    if (recordFound === undefined) return ""

    // if found
    if (!config.typeAdditionalData ||
        !config.typeAdditionalData.columns)
        return "";

    console.log("config.typeAdditionalData ", config.typeAdditionalData);

    const retObj = getLookupValues(config, browserContext.lookupTables, id);

    console.log("retObj", retObj);

    return retObj?.[0]?.label;



};







export default ViewRowCellLookup;