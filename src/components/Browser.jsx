import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './Pages';
import style from './general.css';
//import { createContext } from 'react';
import BrowserContext from './BrowserContext';
import logo from '../logo.svg';
import { useState, useEffect } from 'react';
import extractLookUpTable from './extractLookUpTable';
import axios from 'axios';


const Browser = (props) => {

    const config = props.config;
    const [lookupTables, setLookupTables] = useState({});
    const [lookupTablesReady, setLookupTablesReady] = useState(false);

    //useEffect( ()=> setLookupTables(extractLookUpTable(config)), []);

    useEffect(() => {
        const lookupTableNames = extractLookUpTable(config);
        console.log(lookupTableNames);
        //lookupTablesconsole.log("lookupTables =",lookupTables);
        const promiseArray = [];
        lookupTableNames.forEach(tableName => {
            console.log("for each lookup table", tableName);
            const dataPromise = axios.get(config.rootUrl + tableName);
            dataPromise.then(response => setLookupTables(old => { old[tableName] = response.data; return old; }));
            promiseArray.push(dataPromise);
        });
        Promise.all(promiseArray).then(() => setLookupTablesReady(true));
    }
        , []);


    // const url = config.rootUrl + config.table ;

    // console.log("url=", url);

    // const dataPromise = axios.get(url);

    // dataPromise.then((response) => {
    //         setList(response.data);
    // });


    return (
        <>
            <header className="App-header">
                {/* <div id="hamburgerMenu" onClick={changeMenuState}>
          <svg xmlns="http://www.w3.org/2000/svg" id="hamburgerMenuLines" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
    </div> */}
                <img src={logo} className="App-logo" alt="logo" />
                <div id="title">{config.name}</div>

            </header>
            {lookupTablesReady === true ?
                <BrowserContext.Provider value={{ config, lookupTables }} >
                    <Router basename="/tree-db-browser-2">
                        {config.pages ? <Pages config={config.pages} /> : "waiting for configuration..."}
                    </Router>
                </BrowserContext.Provider>
                :
                "waiting for lookUp tables charging....   "
            }

        </>
    )

}



export default Browser;