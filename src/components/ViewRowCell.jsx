import ViewRowCellLookup from './ViewRowCellLookup';  


const ViewRowCell = (props) =>{

    const config = props.config;
    const tableName = props.tableName;
    const parent = props.parent;
    const value = props.value;

    switch (config.type){
        case "lookup":
            return <ViewRowCellLookup parent={config} />;
        default:
            return value;
    }
}

export default ViewRowCell;