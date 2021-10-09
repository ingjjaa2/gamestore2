import React,{useState,useContext} from 'react';
import Image from 'next/image';
import {AppContext} from '../../context/appContext';

const Index = () => {

    const [state, setstate] = useState({platform:"pc",digital:false});

    const {filters, handleChangeFileters} = useContext(AppContext);

    const handleClickPlatform=(e:any)=>handleChangeFileters({tag:"platform",value:e});

    const handleClickDigital=(e:any)=>handleChangeFileters({tag:"isOnCd",value:e});


    return (
        <div className="barraFiltrosContainer">
            <div className="iconosContainer">
                <Image src="/svg/all.svg" layout="fixed" width={25} height={25} alt="cdIcon"  className={filters.isOnCd?"iconUnActive":"iconActive"} onClick={()=>handleClickDigital(false)}/>
                {/* <Image src="/svg/disk.svg" layout="fixed" width={18} height={18} alt="cdIcon"  className={filters.isOnCd?"iconUnActive":"iconActive"} onClick={()=>handleClickDigital(false)}/> */}
                <Image src="/svg/cd.svg" layout="fixed" width={18} height={18} alt="diskIcon" className={filters.isOnCd?"iconActive":"iconUnActive"} onClick={()=>handleClickDigital(true)}/>
            </div>

            <div className="iconosContainer">
                <Image src="/svg/pc.svg" layout="fixed" width={18} height={18} alt="pcIcon" className={filters.platform==="pc"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("pc")}/>
                <Image src="/svg/xbox.svg" layout="fixed" width={18} height={18} alt="xboxIcon" className={filters.platform==="xbox"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("xbox")}/>
                <Image src="/svg/switch.svg" layout="fixed" width={18} height={18} alt="switchIcon" className={filters.platform==="switch"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("switch")}/>
                <Image src="/svg/ps3.svg" layout="fixed" width={45} height={20} alt="ps3Icon" className={filters.platform==="ps3"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("ps3")}/>
                <Image src="/svg/ps4.svg" layout="fixed" width={45} height={20} alt="ps4Icon" className={filters.platform==="ps4"?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("ps4")}/>
                <Image src="/svg/all.svg" layout="fixed" width={25} height={20} alt="allIcon" className={filters.platform===""?"iconActive":"iconUnActive"} onClick={()=>handleClickPlatform("")}/>
            </div>
        </div>
    )
}

export default Index
