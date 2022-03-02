import ViewRow from "./ViewRow.jsx";
import { useState } from "react";
import { useRef } from "react";


const ViewRows = (props) => {

    const config = props.config;
    const datas = props.datas;

    const upLevelRef = useRef();
    const downLevelRef = useRef();

    const [dataWindowCenterPoint, setDataWindowCenterPoint] = useState(0);

    const dataWindowRay = 1000;
    const dataWindowLevelRay = 100;

    console.log("dataWindowCenterPoint=",dataWindowCenterPoint);

    const revaluateDataWindow = () => {

        //console.log("in printLevels upLevelRef", upLevelRef);
        //console.log("in printLevels downLevelRef", downLevelRef);

            

        if (upLevelRef && upLevelRef.current && upLevelRef.current.getBoundingClientRect().top > 1000){
            setDataWindowCenterPoint((oldValue) => (oldValue - dataWindowLevelRay));
            //console.log("DataWindowCenterPoint uplevel=",upLevelRef.current.getBoundingClientRect().top,"dataWindowCenterPoint",dataWindowCenterPoint);
            console.log("DataWindowCenterPoint uplevel=","dataWindowCenterPoint",dataWindowCenterPoint);
            console.log("lunghewzza aray dati=",datas.length);    
            console.log("in printLevels upLevelRef", upLevelRef);
            console.log("in printLevels downLevelRef", downLevelRef);
        }    
            

        if (downLevelRef && downLevelRef.current  && downLevelRef.current.getBoundingClientRect().top < 100){
            setDataWindowCenterPoint((oldValue) => (oldValue + dataWindowLevelRay));
            //console.log("DataWindowCenterPoint downlevel=",downLevelRef.current.getBoundingClientRect().top,"dataWindowCenterPoint",dataWindowCenterPoint);
            console.log("DataWindowCenterPoint downlevel=","dataWindowCenterPoint",dataWindowCenterPoint);
            console.log("lunghewzza aray dati=",datas.length);
            console.log("in printLevels upLevelRef", upLevelRef);
            console.log("in printLevels downLevelRef", downLevelRef);            
        }    
    }

    const dataWindowMin = Math.max(0, dataWindowCenterPoint - dataWindowRay);    
    const dataWindowMax = Math.min(datas.length-1,dataWindowCenterPoint + dataWindowRay);

    return (
        <tbody className={"ViewRows " + ((props.active === true) ? "activeViewRows" : "inactiveViewRows")} onScroll={revaluateDataWindow}>
            {datas.slice(dataWindowMin,dataWindowMax).map((item, index) =>
                <ViewRow key={item.id} parent={props} index={dataWindowMin + index} data={item}
                    upLevelRef={dataWindowMin + index === (dataWindowCenterPoint - dataWindowLevelRay) ? upLevelRef : null}
                    downLevelRef={dataWindowMin + index === (dataWindowCenterPoint + dataWindowLevelRay) ? downLevelRef : null}
                />
                )
            }
        </tbody>
    )
}
export default ViewRows;