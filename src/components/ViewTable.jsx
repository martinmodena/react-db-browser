import { useState, useEffect } from "react";
import axios from "axios"

import { useParams } from "react-router";


import ViewRows from './ViewRows.jsx';
import ListHeader from './ViewHeader.jsx';


const ListTable = (props) => {

    const [list, setList] = useState([]);

    const [searchString, setSearchString] = useState("");

    const {id} = useParams();

    // RETRIEVING DATAS

        const fetchData = () => {
            const url = props.url;
            return axios.get(url)
                .then((response) => {

                    setList(response.data);

                });
        }
        useEffect(() => { fetchData(); }, []);

    // END OF RETRIEVING DATAS

    // check if in any column of record there is the seearching string   
    // transformed the data into string ("" +item[column]) beacuse the on numbers can t call match  
    const toSearchString = searchString;
    let regExp = new RegExp(toSearchString, 'i');

    const filteredOrderedlist = list.filter(
        (item) => (props.columns.some((column) => ("" + item[column]).match(regExp)))
    );
    // end of filtering

    const handleSearchString = (e) => setSearchString(e.target.value);

    return (
        <div className="viewTable">
            <input type="text" name="nome" onChange={handleSearchString} />
            <table>
            {id}
                <ListHeader columns={props.columns} />
                <ViewRows datas={filteredOrderedlist} columns={props.columns} />
            </table>
        </div>
    )


}

export default ListTable;