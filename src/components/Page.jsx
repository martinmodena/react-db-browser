import React from 'react';

import Edit from './Edit';
import Views from './Views';

import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom'



const Page = (props) => {

  const config = props.config;
  const params = useParams();
  const parent = props.parent;

  const location = useLocation()
  //const { uploadListOnCloseEditPage } = location.state

  console.log("location", location);

  const state = location.state;
  console.log(state);

  console.log("page props=", props);
  //uploadListOnCloseEditPage

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
        {(config.edit) ? <Edit config={config.edit} parent={props} id={params.id} /> : null}
        {(config.views) ? <Views config={config.views} parent={props} id={params.id} /> : null}
      </div>
    </div>
  );
}

export default Page;
