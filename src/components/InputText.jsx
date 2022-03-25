




const InputText = (props) => {

    const config = props.config

    return (<input type="text"  onInput={(e)=>{props.onChangeHandler(e.target.value)}} value={props.value} />)

}

export default InputText;