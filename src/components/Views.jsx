import View from './View';


const Views = (props) => {
    
    const config = props.config;
    

    return (
        <div>
            {
            config.map((viewConfig) => {
                return <View config={viewConfig} />
            }
            )
            }
        </div>
    );
}

export default Views;