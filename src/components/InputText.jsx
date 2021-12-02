import { useState, useEffect } from "react";
import axios from "axios";


const InputText = (props) => {

    const config = props.config;

    //const [waitingForUpdate,setWaitingForUpdate] = useState(false);
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
                    props.parent.parent.config.table + "/" +
                    props.parent.id ;  

        console.log(url);            
        axios.put( url , {"description" : value} ).then((result)=>{
            console.log("result=",result);
            setUpdatedValue(value);
            setUpdating(false);
        })
    };

    useEffect(()=>{
        console.log("config=",config);

        if(inputValue!==updatedValue){
            // update
            if(!updating){
                // do update
                console.log("inputValue===updatedValue ",inputValue,updatedValue);

                console.log("in update", {"description" : inputValue} );
                setUpdating(inputValue);

                update(inputValue);
            //     (function (value){
            //     axios.put( "http://api.martinm38.sg-host.com/rest/1.0/part_type/1" , {"description" : value} ).then((result)=>{
            //         console.log("result=",result);
            //         setUpdatedValue(value);
            //         setUpdating(false);
            //     })
            // })(inputValue);
            }
        }
        else{
            // do nothing
            console.log("inputValue===updatedValue ",inputValue,updatedValue);
        }
        
        
        //printInputValue();
        
    },[clockCounter]);


 

    const printInputValue = () => console.log("sono in printInputValue",inputValue);



    return (<input type="text"  onInput={(e)=>{setInputValue(e.target.value)}} value={inputValue} />)
}

export default InputText;