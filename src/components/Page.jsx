import React from 'react';
import { Route } from 'react-router-dom';
import Edit from './Edit';
import Views from './Views';
//import {React,React.Fragment} from 'react';


const Page = (props) => {

    const config = props.config;

    return (
        <div id="body">
        <div className="pageTitle"> {config.description} </div>
 {/*        
 tolto il menu
  <div id="left-menu" className={leftMenuClass}>
  <ul>
    <li>
      <a className="App-link" href="/" rel="noopener noreferrer" >
        Home
      </a>
    </li>
    <li>
      <a className="App-link" href="/partTypes" rel="noopener noreferrer" >
        Part Types
      </a>
    </li>
  </ul>
 </div> */}
        <div id="body-content">

                {(config.edit)?<Edit config={config.edit} />:""}
                {(config.views)?<Views config={config.views} />:""}
        </div>
    </div>        
    );
}

export default Page;
