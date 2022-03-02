



const ViewRowCellLookup = (props) => {
    const config = props.config;
    const tableName = props.tableName;
    const parent = props.parent;
    const value = props.value;

    return (`lookup${value}`);
};


export default ViewRowCellLookup;