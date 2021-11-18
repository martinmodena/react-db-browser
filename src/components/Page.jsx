import React from 'react';
import { Route } from 'react-router-dom';
import Edit from './Edit';
import Views from './Views';
//import {React,React.Fragment} from 'react';


const Page = (props) => {

    const config = props.config;

    console.log("in page");
    console.log(config);

    return (
            <>
                <Edit config={config.edit} />
                <Views config={config.views} />
            </>
    );
}

export default Page;
