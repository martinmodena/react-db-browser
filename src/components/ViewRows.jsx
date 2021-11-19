//import style from './ListRows.css'; 

const ListRows = (props) => {

    const config = props.config;

    function openEditPage(e){

        console.log("event this.key = ",e);
        //window.open( config.editPage +  this.key);
    }

    return (
        <tbody>
            {props.datas.map((item, index) =>
            
    
        <tr key={item.id} className={(index%2==1)?("even"):("odd")} onClick={()=>window.open( config.editPage + "/" + item.id)} >
                    <td key={"td_mobile_" + item.id} className="mobile" >
                    {config.columns.map((column) => (<p key={"p_" + column.name + "_" + item.id} >{item[column.name]}</p>))}
                    </td>
                    {config.columns.map((column) => (<td key={"td_" + column.name + "_" + item.id} className="desktop"  >{item[column.name]}</td>))}
                </tr>
            
            )
            }
        </tbody>
    )
}
export default ListRows;