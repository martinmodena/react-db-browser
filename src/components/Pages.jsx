import { Routes,Route } from 'react-router-dom';
import Page from './Page';

const Pages = (props) => {

    const config = props.config;
    return (
    <Routes>    
    {config.map((pageConfig)=>( 
           <Route path={(pageConfig.name == "root") ? "/" : ("/" + pageConfig.name + "/:id")} 
            element={<Page config={pageConfig} />}></Route>
            
        
    ))}
    </Routes>)    
}

export default Pages;