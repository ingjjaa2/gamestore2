import React,{useState} from 'react';
import Image from 'next/image';

const menuOptions=[
    {url:"",title:"Home",icon:"/svg/home.svg"},
    {url:"",title:"Sobre Nosotros",icon:"/svg/logoWhite.svg"},
    {url:"",title:"Contactanos",icon:"/svg/ws.svg"},
];

const cards=[
    {id:'sport',title:"Deporte",icon:"/images/Optimized-Sport.png"},
    {id:'racing',title:"Carrera",icon:"/images/Optimized-racing.png"},
    {id:'action',title:"Accion / Aventura",icon:"/images/adventure.png"},
    {id:'child',title:"Niños",icon:"/images/Optimized-childs.png"},
    {id:'rgp',title:"RGP",icon:"/images/Optimized-rgp.png"},
    {id:'shoots',title:"Disparo",icon:"/images/Optimized-shoots.png"},
]

const Index = () => {

    const [activeTypeGame, setActiveTypeGame] = useState('');

    const handleClickCard=(e:any)=>{
        setActiveTypeGame(e)
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
                            <div key={i} className={activeTypeGame===x.id?'homeCardActive':'homeCard'} 
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
                <div>header</div>
                    <Image src="/gift/giftMain.gif" alt="logo" layout='intrinsic' width={1} height={1}/>
                <div>Barra Filtros</div>

                <div>Listas</div>
            </div>
        </div>
    )
}

export default Index