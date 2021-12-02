import View from './View';
import { useState } from 'react';


const Views = (props) => {
    
    const config = props.config;
    
    const [activeView, setActiveView] = useState( "" ) ; 

    const changeActiveView = (newActiveView) => {
        setActiveView((oldActiveView)=>{
            if(newActiveView===oldActiveView){
                return "";
            }
            else{
                return newActiveView;
            }
        });
    }

    return (
        <div className="Views">
            {
            config.map((viewConfig) => {
                return <View config={viewConfig} activeView={activeView} changeActiveView={changeActiveView}/>
            }
            )
            }
        </div>
    );
}

export default Views;