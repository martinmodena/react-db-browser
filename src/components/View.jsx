import ListTable from "./ListTable";


const View = (props) => {

return(
    <div>
        {
            props.viewConfig.sons.map((viewConfig)=><ListTable sonConfig={sonConfig} rootUrl={props.rootUrl} />) 
        }
        
    </div>
);



}


export default View;