import { useState, useEffect } from "react";
import axios from "axios";
import InputText from "./InputText";
import InputLookup from "./InputLookup"



const Input = (props) => {

    const config = props.config;


    const [inputValue, setInputValue] = useState(props.value);
    const [updatedValue, setUpdatedValue] = useState(props.value);
    const [updating, setUpdating] = useState(false);
    const [clockCounter, setClockCounter] = useState(0);

    const msToWait = 800;

    useEffect(() => {
        setInterval(() => {
            setClockCounter((oldValue) => (oldValue + 1));
        }, msToWait);
    }, []);

    const update = (value) => {
        const url = "http://api.martinm38.sg-host.com/rest/1.0/" +
            props.parent.parent.config.table + "/" +
            props.id;

        console.log("props.parent", props.parent);
        console.log("making aupdate", "url=", url, "data", { [config.name]: value });

        axios.put(url, { [config.name]: value }).then((result) => {
            setUpdatedValue(value);
            setUpdating(false);
        })
    };

    useEffect(() => {

        if (inputValue !== updatedValue) {

            if (!updating) {

                setUpdating(inputValue);
                update(inputValue);

            }
        }
        else {
            // do nothing
        }

    }, [clockCounter]);



    const onChangeHandler = (value) => { setInputValue(value) }

    //console.log("config in input", config);

    switch (config.type) {
        case "lookup": {
            return <InputLookup config={config} onChangeHandler={onChangeHandler} value={inputValue} />
        }
        default: {
            return <InputText type="text" onChangeHandler={onChangeHandler} value={inputValue} />
        }
    }


}

export default Input;