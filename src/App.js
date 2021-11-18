import logo from './logo.svg';
import './App.css';
import View from './components/View';
import style from './components/general.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import react from 'react';
import { useState, useEffect } from 'react';



function App() {

  const [leftMenuClass, setLeftMenuClass] = useState("default");
  const [browserConfig, setBrowserConfig] = useState();
  

  useEffect(()=>{
    import("./browserConfig.json").then((result)=>{
      setBrowserConfig(result);
      console.log(browserConfig);
    });
  },[]);

  const changeMenuState = () => {
    if (document.body.clientWidth <= 600) setLeftMenuClass((myleftMenuClass) => ((myleftMenuClass == "open") ? "closed" : "open"))
    else setLeftMenuClass((myleftMenuClass) => ((myleftMenuClass == "closed") ? "open" : "closed"))
  }

  return (

    <div className="App">

      <header className="App-header">
        <div id="hamburgerMenu" onClick={changeMenuState}>
          <svg xmlns="http://www.w3.org/2000/svg" id="hamburgerMenuLines" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <div id="title">React tree</div>

      </header>

      <div id="body">
        {/* <div id="left-menu" className={leftMenuClass}>
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


        <Browser config={browserConfig} />

          {/* <Router>

            <Routes>
              
              {
                (treebrowserConfig?
                  (treebrowserConfig.views.map((viewConfig)=>(
                    <Route path={(viewConfig.name="root")?"/":("/" + viewConfig.name + "/:id")} 
                      element={<View viewConfig={viewConfig} rootUrl={treebrowserConfig.rootUrl} />} >
                    </Route>
                  )
                  
                )):
                ""
                )

              }
              
            </Routes>

          </Router> */}


        </div>
      </div>

    </div>
  );
}


// <!--ListTable columns={columns} url={url} /-->
export default App;
