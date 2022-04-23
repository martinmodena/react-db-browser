//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Browser from './components/Browser';

//commento di martino


function App() {

  const [leftMenuClass, setLeftMenuClass] = useState("default");
  const [browserConfig, setBrowserConfig] = useState(null);



  /*
    useEffect(()=>{
      import("./browserConfig.json").then((result)=>{
        console.log("browserConfig==",result);
        setBrowserConfig(result);
  
      });
    },[]);*/

  useEffect(() => {
    setBrowserConfig(require('./browserConfig.json'));
  }
    , []);

  const changeMenuState = () => {
    if (document.body.clientWidth <= 600) setLeftMenuClass((myleftMenuClass) => ((myleftMenuClass == "open") ? "closed" : "open"))
    else setLeftMenuClass((myleftMenuClass) => ((myleftMenuClass == "closed") ? "open" : "closed"))
  }

  if (browserConfig) {
    console.log("Vediamo questo oggettone", <Browser config={browserConfig} />);
  }

  return (

    <div className="App">

      {(browserConfig) ? (<Browser config={browserConfig} />) : (<div>Charging.. file browserConfig.json</div>)}

    </div>
  );
}


export default App;
