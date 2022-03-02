import ViewRowCell from './ViewRowCell';




const ViewRow = (props) => {

    const data =  props.data; 
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



    return ( 
        <tr ref={(upLevelRef?upLevelRef:(downLevelRef?downLevelRef:null))}
                
                onClick={() => window.open(config.editPage + "/" + data.id)} 
                >
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
        </tr> );
}

const lookUp = (idValue,tableName,columns)=>{

}

export default ViewRow;