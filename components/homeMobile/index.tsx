import React,{useContext} from 'react';
import Image from 'next/image';
import {HeaderMobile} from '../headers';
import FilterBar from '../filtersBar';
import GameCard from '../cards/game';
import {AppContext} from '../../context/appContext';
import {game} from '../../Apollo/repo/game';

const Index = () => {

    const {filteredListGames, handleChangeFileters,filters} = useContext(AppContext);

    const handleClickCard=(e:any)=>{
        handleChangeFileters({tag:"typeOfGame",value:filters.typeOfGame===e?"":e})
    }

    return (
        <div className="homeMobileRoot">
            <HeaderMobile/>
            <Image src="/gift/giftMain.gif" alt="logo" layout='intrinsic' width={1} height={1}/>
            <FilterBar/>
            <div className="listOfgamesMobile scrollContainer">
                    {filteredListGames?.map((x:game,i:number)=><GameCard key={i} game={x}/>)}
            </div>
        </div>
    )
}

export default Index