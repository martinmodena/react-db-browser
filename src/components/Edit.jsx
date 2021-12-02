import axios from "axios";
import BrowserContext from "./BrowserContext.jsx";
import { useContext,useEffect, useState } from "react";
import { useParams } from "react-router";
import Input from './Input.jsx';

const Edit = (props) => {

    const config = props.config; 

    console.log("edit config ",config);

    const [data,setData] = useState(); 

    // retrieve data

    const params = useParams();

    const retrieveData = () => {
        axios.get(browserContext.config.rootUrl + config.table + "/" + params.id).then((result)=>setData(result.data));
    }    

    const updateData = () => {
        console.log("sto facendo l'update");
    }

    const browserContext = useContext(BrowserContext);

    console.log("params.id:",params.id);

    useEffect(retrieveData,[]);

    return (data)?(<div>
        <div>Edit Part</div>
        {config.fields.map((field)=>(<div>{browserContext.config.rootUrl + " " + field.name + " " + field.type }
            <Input type="text" value={data[field.name]} config={field} parent={props} id={params.id}/></div>))}
        </div>):(<>loading...</>)
}

export default Edit;