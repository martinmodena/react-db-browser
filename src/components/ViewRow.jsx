import ViewRowCell from './ViewRowCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ViewRow = (props) => {

    const data = props.data;
    const parent = props.parent;
    const config = parent.config;
    const index = props.index;
    const upLevelRef = props.upLevelRef;
    const downLevelRef = props.downLevelRef;

    // const setFunctionGetHighLevelHandler = props.setFunctionGetHighLevelHandler;


    // if(setFunctionGetHighLevelHandler){
    //     console.log("in viewRow i'm setting functionGetHighLevelHandler");
    //     setFunctionGetHighLevelHandler( function(){ console.log("ref=",ref); } );
    // }

    //return <div>"pippo"</div>;   

    config.columns.forEach(element => {

    });

    const uploadListOnCloseEditPage = () => alert("martino");

    return (
        <tr ref={(upLevelRef ? upLevelRef : (downLevelRef ? downLevelRef : null))} >
            <td key={"td_mobile_" + data.id} className="mobile" >
                {config.columns.map((column) =>
                (<p key={"p_" + column.name + "_" + data.id} >
                    <ViewRowCell config={column} value={data[column.name]} />
                </p>)
                )
                }
            </td>
            {config.columns.map((column) => (<td key={"td_" + column.name + "_" + data.id} className="desktop"  >
                <ViewRowCell config={column} value={data[column.name]} />
            </td>))}
            {/* <td onClick={() => window.open(config.editPage + "/" + data.id, "_self")}><FontAwesomeIcon icon={faEdit} /></td>
            <td onClick={() => { props.deleteRecord(data.id) }}><FontAwesomeIcon icon={faSquareMinus} /></td> */}
            <td>
                {/* <Link to={"/" + config.editPage + "/" + data.id}
                    state={{ uploadListOnCloseEditPage: uploadListOnCloseEditPage, martino: "martin modena" }}
                > */}
                <Link to={
                    {
                        pathname: ("/" + config.editPage + "/" + data.id),
                        hash: "superbellissimo",
                        state: { martino: "martin modena" }
                    }

                }
                    state={{ mmm: "a parte" }}
                >
                    <FontAwesomeIcon icon={faEdit} />pippo
                </Link>
            </td>
            <td onClick={() => { props.deleteRecord(data.id) }}><FontAwesomeIcon icon={faSquareMinus} /></td>
        </tr>);
}

const lookUp = (idValue, tableName, columns) => {

}




export default ViewRow;