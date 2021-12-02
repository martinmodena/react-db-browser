
import InputText from "./InputText"



const Input = (props) => {

    const config = props.config




    return (<InputText value={props.value} config={config} parent={props} />)

}

export default Input;