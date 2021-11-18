
const ViewHeader = (props) => {

    const config = props.config;

    //console.log("in viewheader",config);

    return (
        <thead>
            <th className="mobile">All the fields</th>
            {config.columns.map((item) => <th className="desktop">{item.name}</th>) }
        </thead>
    )
}

export default ViewHeader;