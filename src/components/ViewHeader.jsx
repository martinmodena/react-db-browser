
const ViewHeader = (props) => {

    const config = props.config;

    let columnKey = 0;

    return (
        <thead>
            <tr>
                <th className="mobile">All the fields</th>
                {config.columns.map((item) => <th key={columnKey++} className="desktop">{item.name}</th>)}
            </tr>
        </thead>
    )
}

export default ViewHeader;