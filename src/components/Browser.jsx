import { BrowserRouter as Router  } from 'react-router-dom';
import Pages from './Pages';
import style from './general.css';
import {  createContext  } from 'react';
import BrowserContext  from './BrowserContext';



const Browser = (props) => {

    const config = props.config;

    //console.log("in browser",config.name);

    

    return (
        <BrowserContext.Provider value={{"config":config}} >
        <Router> 
                <Pages config={config.pages} />
        </Router>
        </BrowserContext.Provider>
    )


}


export default Browser;