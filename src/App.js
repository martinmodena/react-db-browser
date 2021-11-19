import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Browser from './components/Browser';



function App() {

  const [leftMenuClass, setLeftMenuClass] = useState("default");
  const [browserConfig, setBrowserConfig] = useState();
  

  useEffect(()=>{
    import("./browserConfig.json").then((result)=>{
      console.log("ho caricato il file");
      console.log(result);
      //setBrowserConfig(result);
      setBrowserConfig(result);
      console.log("name=");
      console.log(browserConfig);
    });
  },[]);

  const changeMenuState = () => {
    if (document.body.clientWidth <= 600) setLeftMenuClass((myleftMenuClass) => ((myleftMenuClass == "open") ? "closed" : "open"))
    else setLeftMenuClass((myleftMenuClass) => ((myleftMenuClass == "closed") ? "open" : "closed"))
  }

  return (

    <div className="App">

        {(browserConfig)?(<Browser config={browserConfig} />):(<div>Charging.. file browserConfig.json</div>)}

    </div>
  );
}


export default App;
