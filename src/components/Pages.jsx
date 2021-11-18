import { Routes } from 'react-router-dom';

const Pages = (props) => {

    props.config.map((pageConfig)=>( 
        <Routes>   
            <Page config={pageConfig} />
        </Routes>
    ))    
}

export default Pages;