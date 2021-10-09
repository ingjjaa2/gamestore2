import React,{useState,useContext,useEffect} from 'react';
import Image from 'next/image';
import {HeaderWeb} from '../headers';
import FilterBar from '../filtersBar';

import {AppContext} from '../../context/appContext';

import {game} from '../../Apollo/repo/game';

import GameCard from '../cards/game';


const menuOptions=[
    {url:"",title:"Home",icon:"/svg/home.svg"},
    {url:"",title:"Sobre Nosotros",icon:"/svg/logoWhite.svg"},
    {url:"",title:"Contactanos",icon:"/svg/ws.svg"},
];

const cards=[
    {id:'Deportes',title:"Deporte",icon:"/images/Optimized-Sport.png"},
    {id:'Carrera',title:"Carrera",icon:"/images/Optimized-racing.png"},
    {id:'Accion',title:"Accion / Aventura",icon:"/images/adventure.png"},
    {id:'Niños',title:"Niños",icon:"/images/Optimized-childs.png"},
    {id:'RGP',title:"RGP",icon:"/images/Optimized-rgp.png"},
    {id:'Disparos',title:"Disparo",icon:"/images/Optimized-shoots.png"},
]

const Index = () => {

    const [activeTypeGame, setActiveTypeGame] = useState('');

    const {filteredListGames, handleChangeFileters,filters} = useContext(AppContext);


    const handleClickCard=(e:any)=>{
        handleChangeFileters({tag:"typeOfGame",value:filters.typeOfGame===e?"":e})
    }


    return (
        <div className="homeWebRoot">
            <div className="homeWebRootLeftSide">
                {/* Logo */}
                <span className="homeWebLogo">
                    <Image src="/images/logoWithName.png" alt="logo" layout="fixed" width={190} height={90}  />
                </span>
                {/* Menu */}
                <div className="homeWebMenu">
                    {menuOptions.map((x:any,i:number)=>{
                        return(
                            <div key={i} className="homeWebMenuElement">
                                <Image src={x.icon} alt="logo" layout="fixed" width={15} height={15}/>
                                <span>{x.title}</span>
                            </div>
                        );
                    })}
                </div>
                {/* Cards */}
                <div className="homeWebCardsContainer">
                    {cards.map((x:any,i:number)=>{
                        return(
                            <div key={i} className={filters.typeOfGame===x.id?'homeCardActive':'homeCard'} 
                                style={{backgroundImage:`url(${x.icon})`}} onClick={()=>handleClickCard(x.id)}>
                                {x.title}
                            </div>
                        );
                    })}
                </div>
                {/* Image Footer */}
                <span className="homeWebFooterImage">
                    <Image src="/images/Optimized-CoinsSell.png" alt="logo" layout="fixed" width={170} height={110}  />
                </span>
            </div>

            <div className="homeWebRootRightSide">
                <HeaderWeb/>
                <Image src="/gift/giftMain.gif" alt="logo" layout='intrinsic' width={1} height={1}/>
                <FilterBar/>
                <div className="listOfgames scrollContainer">
                    {filteredListGames?.map((x:game,i:number)=><GameCard key={i} game={x}/>)}
                </div>
            </div>
        </div>
    )
}

export default Index