import React from 'react';
import { useRouter } from 'next/router';
import {game} from '../../interface/game';
import Image from 'next/image';

const Game = ({game}:{game:game}) => {

    const router = useRouter();

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

    const handleClickCard=()=>{
        if(game?.id){
            router.push(`/game/${game.id}`)
        }
    }

    return (
        <div className="cardGameContainer" onClick={handleClickCard}>
            <div className="cardgameImage" style={{backgroundImage:`url(${game.cardUrl})`}}>
                {/* header */}
                <div className="cardGameHeader">
                    <div className="cardGameHeaderStartBox">
                        {game.start}
                        <Image src="/svg/start.svg" layout="fixed" width={15} height={15} alt="cdIcon"  className="iconActive" />
                    </div>
                </div>

                {/* Footer */}
                <div className="cardGameFotter">
                    <div className="cardGameFotterLeft">
                        {game.isOnCd&&(<Image src="/svg/cd.svg" layout="fixed" width={18} height={18} alt="cdIcon"  className="iconActive" />)}
                        {!game.isOnCd&&(<Image src="/svg/disk.svg" layout="fixed" width={18} height={18} alt="cdIcon"  className="iconActive" />)}
                    </div>
                    <div className="cardGameFotterRight">
                        <HandlePlatformIcon platform={game.platform}/>
                    </div>

                </div>
            </div>
            <div className="cardGameName">
                {game.name}
            </div>
        </div>
    )
}

export default Game
