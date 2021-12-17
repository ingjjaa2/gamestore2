import React,{useEffect,useState} from 'react';
import Image from 'next/image';
import {HeaderMobile} from '../headers';
import {game} from '../../interface/game';
import Slider,{sliderData} from '../sliderMobile';
import {fetchSinToken} from '../../helper/fetches';

const Index = ({gamePage}:{gamePage:game}) => {

    const [activeGame, setActiveGame] = useState<game>();

    const [multimediaList, setMultimediaList] = useState<sliderData[]>([]);


    useEffect(() => {
                const _multimediaList:sliderData[]=[];
                setActiveGame(gamePage);
                gamePage?.videos?.forEach((videoUrl:any) => _multimediaList.push({
                    title:"",
                    url:videoUrl,
                    isVideo:true
                }));
                gamePage?.images?.forEach((imageUrl:any) => _multimediaList.push({
                    title:"",
                    url:imageUrl,
                    isVideo:false
                }));
                gamePage?.screenshots?.forEach((imageUrl:any) => _multimediaList.push({
                    title:"",
                    url:imageUrl,
                    isVideo:false
                }));
                setMultimediaList(_multimediaList);
        }, [gamePage])

    const HandlePlatformIcon=({platform}:{platform:string})=>{
        switch (platform) {
            case "pc":
                return(
                    <Image src="/svg/pc.svg" layout="fixed" width={18} height={18} alt="pcIcon" className="iconActive" />
                )
            case "xbox":
                return(
                    <Image src="/svg/xbox.svg" layout="fixed" width={18} height={18} alt="xboxIcon" className="iconActive" />
                )
            case "switch":
                return(
                    <Image src="/svg/switch.svg" layout="fixed" width={18} height={18} alt="switchIcon" className="iconActive" />
                )
            case "ps3":
                return(
                    <Image src="/svg/ps3.svg" layout="fixed" width={45} height={20} alt="ps3Icon" className="iconActive" />
                )
            case "ps4":
                return(
                    <Image src="/svg/ps4.svg" layout="fixed" width={45} height={20} alt="ps4Icon" className="iconActive" />
                )
        
            default:
                return(<></>)
        }
    }


    return (
        <div className="gameMobileRoot">
            <HeaderMobile/>
            <div className="gameBodyMobile">
                <div className="gameImageHeaderMobile  animate__animated animate__zoomInUp" style={{backgroundImage:`url(${activeGame?.banneUrl})`}}/>
                <div className="gameInfoContainerMobile">
                    {/* Box with name prices and year */}
                <div className="gameSummaryBoxMobile animate__animated animate__fadeInLeft">
                        <div className="gameSummaryBoxTitle">
                            <span>{activeGame?.name}</span>
                            <span className="gameSummaryBoxYear">{activeGame?.ano}</span>
                        </div>
                        <div className="gameSummaryBoxButtonsContainer">
                            <div className="gameSummaryBoxButtonButtonsSell">
                                <span className="gameSummaryBoxButtonButtonsSellText">Precio venta</span>
                                <span className="gameSummaryBoxButtonButtonsSellPrice">{activeGame?.precioVenta} u$d</span>
                                <span className="gameSummaryBoxButtonButtonsSellText">Consultar</span>
                            </div>
                            
                            <div className="gameSummaryBoxButtonButtonsChange">
                                <span className="gameSummaryBoxButtonButtonsSellText">Consultar Cambio</span>
                            </div>
                        </div>
                    </div>
                
                    {/* Version  plaataforma  */}
                    <div className="gameInfoIconContainerMobile">
                            <HandlePlatformIcon platform={activeGame?.platform||""}/>

                            {activeGame?.isOnCd&&(
                                <div className="gameInfoVersionBox">
                                    <Image src="/svg/cd.svg" layout="fixed" width={15} height={15} alt="cdIcon"  className="iconActive" />
                                    <span>Version Fisica</span>
                                </div>
                            )}
                            
                            {activeGame?.isOnDigital&&(
                                <div className="gameInfoVersionBox">
                                    <Image src="/svg/disk.svg" layout="fixed" width={15} height={15} alt="cdIcon"  className="iconActive" />
                                    <span>Version Digital</span>
                                </div>                            
                            )}
                        </div>
                    
                    {/* Video */}
                    <div className="gameImageVideoMobile loadingComponent animate__animated animate__zoomInRight animate__delay-1s">
                        <iframe width="100%" height="100%" src={multimediaList[0]?.url?.replace('watch?v=','embed/')} allowFullScreen={true}/>
                    </div>

                    {/* Details */}
                    <div className="gameInfoDetailBoxMobile animate__animated animate__fadeInDown">{activeGame?.detail}</div>
                    {/* Slides */}
                    <Slider data={multimediaList.slice(1,multimediaList.length)}/>
                </div>
            </div>

        </div>
    )
}

export default Index
