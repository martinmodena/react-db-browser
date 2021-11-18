import { Route } from react - router - dom;


const Page = (props) => {

    const config = props.config;

    return (
    <Route path={(config.name = "root") ? "/" : ("/" + config.name + "/:id")} >
        <Edit config={config.edit} />
        <Views config={config.views} />
    </Route>
    );
}


export default Page;
