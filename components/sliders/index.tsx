import React,{useState} from 'react';
import Image from 'next/image';
import {useWindowSizeChange} from '../../hooks/useWindowSizeChange';

export interface sliderData{
    title:string,
    url:string,
    isVideo:boolean
}


const Index = ({data}:{data:sliderData[]}) => {

    const [state, setstate] = useState<any|undefined>();

    const {width,height}=useWindowSizeChange();

    const handleClickImage=(e:any)=>{
        setstate(e);
    }

    const handleClickArrow=(e:number)=>{
        const container = document.getElementById('scrollContainer');
        if(container!==null){
            container.scrollLeft += e;
        }
    }

    return (
        <>
        <div className="slidersRoot" >
            <span className="sliderRowContainerLeft" onClick={()=>handleClickArrow(-180)}> 
                <Image src="/svg/chevronLeft.svg" alt="image" layout="fixed" width={50} height={50}  /> 
            </span>
            <div className="slidersHorizontalList" id="scrollContainer">
            {data.map((x:sliderData,i:number)=>{
                if(x.isVideo){
                    return(
                        <div key={i} className="slideVideo" >
                                <iframe width="100%" height="100%"src={x.url.replace('watch?v=','embed/')} allowFullScreen={true}/>
                        </div>
                    )
                }else{
                    return(
                        <div key={i} className="slidersImage loadingComponent" onClick={()=>handleClickImage(x.url)}>
                            <Image src={x.url} alt="image" layout="fixed" width={360} height={190}  />
                        </div>
                    )
                }
            })}                            
            </div>
            <span className="sliderRowContainerRight" onClick={()=>handleClickArrow(180)}> 
                <Image src="/svg/chevronRight.svg" alt="image" layout="fixed" width={50} height={50}  /> 
            </span>
        </div>
        {state&&(
            <>
            <div className="slideImageModalOutsideBox" onClick={()=>handleClickImage(undefined)}/>
            <div className="slideImageModalBox loadingComponent">
                    <span className="slideImageModalBoxCloseButton" onClick={()=>handleClickImage(undefined)}>
                        <Image src="/svg/close.svg" alt="image" layout="fixed" width={22} height={22}  />
                    </span>
                    <Image src={state} alt="image" layout="fixed" width={width*0.75} height={height*0.75}  />
            </div>
            </>
        )}

        </>
    )
}

export default Index
