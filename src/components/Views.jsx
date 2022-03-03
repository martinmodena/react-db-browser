import View from './View';
import { useState } from 'react';


const Views = (props) => {
    
    const config = props.config;
    const parent = props.parent;
    
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

    let viewKey = 0;
    return (
        <div className="Views">
            {
            config.map((viewConfig) => {
                return <View key={viewKey++} config={viewConfig}  parent={props} activeView={activeView} changeActiveView={changeActiveView}/>
            }
            )
            }
            <table>
                <thead>
                    <tr>
                        <th>prima intestazione </th>
                        <th>seconda intestazione</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <th>prima</th>
                        <th>seconda</th>
                    </tr>  
                                    <tr>
                        <th>prima</th>
                        <th>seconda</th>
                    </tr>                    
                </tbody>
            </table>
        </div>
    );
}

export default Views;