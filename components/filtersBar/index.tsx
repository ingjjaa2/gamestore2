import React,{useState} from 'react';
import Image from 'next/image';

const Index = () => {

    const [state, setstate] = useState({platform:"pc",digital:false});

    const handleClickPlatform=(e:any)=>setstate({...state,platform:e});

    const handleClickDigital=(e:any)=>setstate({...state,digital:e});


    return (
        <div className="barraFiltrosContainer">
            <div className="iconosContainer">
                <Image src="/svg/cd.svg" layout="fixed" width={18} height={18} alt="cdIcon"  className={state.digital?"iconUnActive":"iconActive"} onClick={()=>handleClickDigital(false)}/>
                <Image src="/svg/disk.svg" layout="fixed" width={18} height={18} alt="diskIcon" className={state.digital?"iconActive":"iconUnActive"} onClick={()=>handleClickDigital(true)}/>
            </div>

            <div className="iconosContainer">
                <Image src="/svg/pc.svg" layout="fixed" width={18} height={18} alt="pcIcon" className={state.platform==="pc"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("pc")}/>
                <Image src="/svg/xbox.svg" layout="fixed" width={18} height={18} alt="xboxIcon" className={state.platform==="xbox"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("xbox")}/>
                <Image src="/svg/switch.svg" layout="fixed" width={18} height={18} alt="switchIcon" className={state.platform==="switch"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("switch")}/>
                <Image src="/svg/ps3.svg" layout="fixed" width={45} height={20} alt="ps3Icon" className={state.platform==="ps3"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("ps3")}/>
                <Image src="/svg/ps4.svg" layout="fixed" width={45} height={20} alt="ps4Icon" className={state.platform==="ps4"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("ps4")}/>
            </div>
        </div>
    )
}

export default Index
