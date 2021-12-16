import ViewRow from "./ViewRow.jsx";
import { useState } from "react";
import { useRef } from "react";


const ViewRows = (props) => {

    const config = props.config;
    const datas = props.datas;

    const upLevelRef = useRef();
    const downLevelRef = useRef();

    const [dataWindowCenterPoint, setDataWindowCenterPoint] = useState(0);

    const dataWindowRay = 10000;
    const dataWindowLevelRay = 1000;

    console.log("dataWindowCenterPoint=",dataWindowCenterPoint);

    const revaluateDataWindow = () => {

        // console.log("in printLevels upLevelRef", upLevelRef);
        // console.log("in printLevels downLevelRef", downLevelRef);


        if (upLevelRef && upLevelRef.current && upLevelRef.current.getBoundingClientRect().top > 1000)
            setDataWindowCenterPoint((oldValue) => (oldValue - dataWindowLevelRay));
            // console.log("DataWindowCenterPoint uplevel=",upLevelRef.current.getBoundingClientRect().top,"dataWindowCenterPoint",dataWindowCenterPoint);

            

        if (downLevelRef && downLevelRef.current  && downLevelRef.current.getBoundingClientRect().top < 100)
            setDataWindowCenterPoint((oldValue) => (oldValue + dataWindowLevelRay));
            // console.log("DataWindowCenterPoint downlevel=",downLevelRef.current.getBoundingClientRect().top,"dataWindowCenterPoint",dataWindowCenterPoint);

    }


    return (
        <tbody className={"ViewRows " + ((props.active === true) ? "activeViewRows" : "inactiveViewRows")} onScroll={revaluateDataWindow}>
            {datas.map((item, index) =>
            (((index < (dataWindowCenterPoint - dataWindowRay) || index > (dataWindowCenterPoint + dataWindowRay)))?null:(
                <ViewRow key={item.id} parent={props} index={index} data={item}
                    upLevelRef={index === (dataWindowCenterPoint - dataWindowLevelRay) ? upLevelRef : null}
                    downLevelRef={index === (dataWindowCenterPoint + dataWindowLevelRay) ? downLevelRef : null}
                />)
            )
            )
            }
        </tbody>
    )
}
export default ViewRows;