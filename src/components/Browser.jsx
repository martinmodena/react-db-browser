import { BrowserRouter as Router  } from 'react-router-dom';


const Browser = (props) => {

    return (
        <Router>
                <Pages config={props.config.pages} />
        </Router>
    )

}

export default Browser;