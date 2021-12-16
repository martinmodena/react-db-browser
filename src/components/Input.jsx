import { useState, useEffect } from "react";
import axios from "axios";
import InputText from "./InputText";



const Input = (props) => {

    const config = props.config;

    
    const [inputValue,setInputValue] = useState(props.value);
    const [updatedValue,setUpdatedValue] = useState(props.value);
    const [updating,setUpdating] = useState(false);
    const [clockCounter,setClockCounter] = useState(0);

    const msToWait = 8000;

    useEffect(()=>{
        setInterval(() => {
            setClockCounter((oldValue)=>(oldValue+1));
        }, msToWait);
    },[]);

    const update = (value) => {
        const url = "http://api.martinm38.sg-host.com/rest/1.0/" + 
                    props.parent.config.table + "/" +
                    props.id ;  
        
        axios.put( url , {"description" : value} ).then((result)=>{
 
            setUpdatedValue(value);
            setUpdating(false);
        })
    };

    useEffect(()=>{

        if(inputValue!==updatedValue){

            if(!updating){

                setUpdating(inputValue);
                update(inputValue);

            }
        }
        else{
            // do nothing
        }       
        
    },[clockCounter]);



    const onChangeHanlder = (value) => { setInputValue(value) }

    return (<InputText type="text"  onChangeHanlder={onChangeHanlder} value={inputValue} />)
}

export default Input;