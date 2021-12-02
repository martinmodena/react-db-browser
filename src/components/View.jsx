import { useState, useEffect, useContext } from "react";
import axios from "axios"

import { useParams } from "react-router";


import ViewRows from './ViewRows.jsx';
import ViewHeader from './ViewHeader.jsx';
import { configure } from "@testing-library/dom";


import BrowserContext  from './BrowserContext';


const View = (props) => {

    const [list, setList] = useState([]);

    const [searchString, setSearchString] = useState("");

    const {id} = useParams();

    const config = props.config;

    const browserContext = useContext(BrowserContext);

    console.log("browserContext",browserContext);

    //const rootUrl = "http://api.martinm38.sg-host.com/rest/1.0/";

    const rootUrl = browserContext.config.rootUrl;


    // RETRIEVING DATAS

        const fetchData = () => {
            //const url = config.url;
            
            // "http://api.martinm38.sg-host.com/rest/1.0/part_type/"
            const url = rootUrl + config.table + "/";
            //console.log("browserContext=",browserContext);
            axios.get(url)
                .then((response) => {
                    //console.log("records=",response.data);    
                    setList(response.data);

                });
        }
        useEffect( fetchData, [] );

    // END OF RETRIEVING DATAS

    // check if in any column of record there is the seearching string   
    // transformed the data into string ("" +item[column]) beacuse the on numbers can t call match  
    const toSearchString = searchString;
    let regExp = new RegExp(toSearchString, 'i');

    const filteredOrderedlist = list.filter(
        (item) => (config.columns.some((column) => ("" + item[column.name]).match(regExp)))
    );
    // end of filtering

    const handleSearchString = (e) => setSearchString(e.target.value);

    return (
        <div onClick={()=>{props.changeActiveView(config.table)}} className={(props.activeView===config.table)?"activeView":""}>
            <hr />
            <p>{config.table + " " + filteredOrderedlist.length + " records"} </p>
            <input type="text" name="nome" onChange={handleSearchString} />
            <table>
                <ViewHeader config={config} />
                <ViewRows datas={filteredOrderedlist} config={config} active={(props.activeView===config.table)?true:false} />
            </table>
        </div>
    )


}

export default View;