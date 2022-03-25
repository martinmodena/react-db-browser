import axios from "axios";
import BrowserContext from "./BrowserContext.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Input from './Input.jsx';

const Edit = (props) => {

    const config = props.config;

    const [data, setData] = useState();

    // retrieve data

    const params = useParams();

    const retrieveData = () => {

        axios.get(browserContext.config.rootUrl + props.parent.config.table + "/" + params.id).then((result) => setData(result.data));
    }




    //console.log("in edit config=", config);

    const browserContext = useContext(BrowserContext);

    let fieldKey = 0;

    useEffect(retrieveData, []);

    return (data) ? (<div>
        <div>Edit Part</div>
        <table>
            <thead><tr><th>Field</th><th>Value</th></tr></thead>
            <tbody>
                {config.fields.map((field) => (
                    <tr key={fieldKey++} >
                        <td >{field.name}</td>
                        <td><Input type="text" value={data[field.name] || ""} config={field} parent={props} id={params.id} /></td>
                    </tr>
                )
                )
                }
            </tbody>
        </table>

    </div>) : (<>loading...</>)
}

export default Edit;