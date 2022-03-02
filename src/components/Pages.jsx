import { Routes,Route } from 'react-router-dom';
import Page from './Page';

const Pages = (props) => {

    const config = props.config;

    console.log("Pages config = ",config);

    let pageKey = 0;
    return (
    <Routes>    
    {config.map((pageConfig)=>( 
           <Route key={pageKey++} path={(pageConfig.name == "root") ? "/" : ("/" + pageConfig.name + "/:id")} 
            element={<Page config={pageConfig} parent={props}/>}></Route>
    ))}
    </Routes>)    
}

export default Pages;