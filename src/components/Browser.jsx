import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './Pages';
import style from './general.css';
//import { createContext } from 'react';
import BrowserContext from './BrowserContext';
import logo from '../logo.svg';



const Browser = (props) => {

    const config = props.config;

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

                    <BrowserContext.Provider value={{ "config": config }} >
                        <Router basename="/tree-db-browser-2">
                            <Pages config={config.pages} />
                        </Router>
                    </BrowserContext.Provider>


        </>
    ) 


}


export default Browser;