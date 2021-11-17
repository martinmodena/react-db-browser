
const ListHeader = (props) => {

    return (
        <thead>
            <th className="mobile">All the fields</th>
            {props.columns.map((item) => <th className="desktop">{item}</th>) }
        </thead>
    )
}

export default ListHeader;