import axios from "axios";
import BrowserContext from "./BrowserContext.jsx";
import { useContext,useEffect, useState } from "react";
import { useParams } from "react-router";
import Input from './Input.jsx';

const Edit = (props) => {

    const config = props.config; 

    const [data,setData] = useState(); 

    // retrieve data

    const params = useParams();

    const retrieveData = () => {

        axios.get(browserContext.config.rootUrl + props.parent.config.table + "/" + params.id).then((result)=>setData(result.data));
    }    

    console.log("in edit config=", config);

    const browserContext = useContext(BrowserContext);

    let fieldKey = 0;    

    useEffect(retrieveData,[]);

    return (data)?(<div>
        <div>Edit Part</div>
        {config.fields.map((field)=>(<div key={fieldKey++} >{ field.name }
        <Input type="text" value={data[field.name]} config={field} parent={props} id={params.id}/></div>))}
        </div>):(<>loading...</>)
}

export default Edit;