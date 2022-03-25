import BrowserContext from "./BrowserContext";
import { useContext, useState, useEffect } from "react";
import Select from 'react-select';

const InputLookup = (props) => {

    const config = props.config;
    const browserContext = useContext(BrowserContext);
    const lookupTableName = config.name.substring(0, config.name.length - 3);

    const [id, setId] = useState(props.value);

    useEffect(() => props.onChangeHandler(id), [id]);

    if (!browserContext ||
        !browserContext.lookupTables ||
        !browserContext.lookupTables[lookupTableName]) {
        console.log("browserContext.lookupTables=", browserContext.lookupTables);
        console.log("lookupTableName=", lookupTableName, "browserContext.lookupTables[lookupTableName]=", browserContext.lookupTables[lookupTableName]);
        //console.log("non c'è la tabella con nome",lookupTableName,"browser context = ",browserContext ,"props",props);
        return "charging lookupTables....";
    }

    // if found
    if (!config.typeAdditionalData ||
        !config.typeAdditionalData.columns)
        return "InputLookUp typeAdditionalData not found";

    //console.log("config.typeAdditionalData ", config.typeAdditionalData);


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


    // console.log("InputLookupconfig:lookupTableName", lookupTableName);
    // console.log("InputLookupconfig:config", config);

    // console.log("InputLookupconfig:browserContext.lookupTables", browserContext.lookupTables);

    const lookupValues = getLookupValues(config, browserContext.lookupTables, null);

    //console.log("lookupValues=", lookupValues);

    // return (<select value={props.value} onChange={(e) => { props.onChangeHandler(e.target.value) }}>
    //     {lookupValues.map((lookupValue) => <option value={lookupValue.id}>{lookupValue.description}</option>)}
    // </select>);

    const changeHandler = (option) => setId(option.value);

    //console.log("lookupValues=", lookupValues, "id", id);

    let selectedOption = lookupValues.find(record => record.value === id);

    //console.log("2lookupValues=", lookupValues, "id", id, "selectedOption", selectedOption);

    if (!selectedOption) {
        selectedOption = { value: null, label: "value not in lookupTable" }
    }


    return (
        <div style={{ color: "black" }}>
            <Select
                defaultValue={selectedOption}
                onChange={changeHandler}
                options={lookupValues}
            />
        </div>
    )
}

export default InputLookup;