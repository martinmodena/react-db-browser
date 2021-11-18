//import style from './ListRows.css'; 

const ListRows = (props) => {

    const config = props.config;

    const joinCellContents4Mobile = (item, columns) => {
        let retString = '';
        let firstColumn = true;
        columns.map((fieldName) => {
            if (!firstColumn) {
                retString += <br />;
            }
            else {
                firstColumn = false;
            }
            retString += item[fieldName];
        }
        )
        return (retString);
    }

    //{props.columns.map((fieldName) => (<p key={"p_" + fieldName + "_" + item.id} >{item[fieldName]}</p>))}
              
    //alert(joinCellContents4Mobile);

    return (
        <tbody>
            {props.datas.map((item, index) =>
            (
                <tr key={"row_" + item.id} className={(index%2==1)?("even"):("odd")}>
                    <td key={"td_mobile_" + item.id} className="mobile" >
                    {config.columns.map((column) => (<p key={"p_" + column.name + "_" + item.id} >{item[column.name]}</p>))}
                    </td>
                    {config.columns.map((column) => (<td key={"td_" + column.name + "_" + item.id} className="desktop" >{item[column.name]}</td>))}
                </tr>
            )
            )
            }
        </tbody>
    )
}
export default ListRows;