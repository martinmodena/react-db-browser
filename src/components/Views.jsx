import View from './View';
import { useState } from 'react';


const Views = (props) => {
    
    const config = props.config;
    const parent = props.parent;
    
    // const [activeView, setActiveView] = useState( "" ) ; 

    // const changeActiveView = (newActiveView) => {
    //     setActiveView((oldActiveView)=>{
    //         if(newActiveView===oldActiveView){
    //             return "";
    //         }
    //         else{
    //             return newActiveView;
    //         }
    //     });
    // }

    let viewKey = 0;
    return (
        <div className="Views">
            {
            config.map((viewConfig) => {
                     return <View key={viewKey++} config={viewConfig}  parent={props} />
            }
            )
            }

        </div>
    );
}

export default Views;