import React,{useState,useContext} from 'react'
import Image from 'next/image';
import {AppContext} from '../../context/appContext';

const headerOptions=[
    {id:"games",title:"Juegos22"},
    {id:"subscriptions",title:"Subscripciones"},
    {id:"services",title:"Servicios"}
];


export const HeaderWeb = () => {

    const [state, setstate] = useState({searchBarValue:"",activeMenu:'games'})
    
    const {handleChangeFileters,filters} = useContext(AppContext)

    const handleOnChange=(e:any)=>{
        // setstate({...state,[e.target.name]:e.target.value});
        handleChangeFileters({tag:'headerText',value:e.target.value});
    }

    const handleClickMenu=(e:any)=>{
        setstate({...state,activeMenu:e});
    }



    return (
        <div className="headerWebRoot">
            {/* SearchBar */}
            <span className="searchBarContainer">
                <input
                  name="searchBarValue"
                  className="inputNoneClase"
                  value={filters.headerText}
                  onChange={handleOnChange}
                  autoComplete="off"
                />
                <span className="searchBarContainerIcon">
                    <Image src="/svg/lockForWhite.svg" layout='fixed' width={18} height={15} alt="searchicon"/>
                </span>
            </span>
        
            {/* Menu */}
            <div className="headersmenuContainer">
                {headerOptions.map((x:any,i:number)=>(
                    <span key={i} className={state.activeMenu===x.id?'headerActiveElement':'headerUnActiveElement'} onClick={()=>handleClickMenu(x.id)}>
                        {x.title}
                    </span>
                ))}
            </div>

            {/* Iconos */}
            <span className="headersIcons">
                    <Image src="/svg/userAccount.svg" layout='fixed' width={20} height={20} alt="userIcon"/>
            </span>
            <span className="headersIcons">
                <Image src="/svg/ws.svg" layout='fixed' width={20} height={20} alt="wsicon"/>
            </span>
        </div>
    )
}

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

export const HeaderMobile = () => {

    const [state, setstate] = useState({showFilter:false,showMenuDrawer:false});

    const {handleChangeFileters,filters} = useContext(AppContext)

    const handleOnChange=(e:any)=>{
        handleChangeFileters({tag:'headerText',value:e.target.value});
    }

    const handleOpenCloseDrawer=(e:any)=>{
        setstate({...state,showMenuDrawer:!state.showMenuDrawer})
    }

    const handleShowHideSearchbar=(e:any)=>{
        setstate({...state,showFilter:!state.showFilter})
    }

    const handleClickCard=(e:any)=>{
        handleChangeFileters({tag:"typeOfGame",value:filters.typeOfGame===e?"":e})
    }

    return (
        <>
        {/* Header */}
        <div className="headersMobileRoot">
            <Image src="/svg/menu.svg" layout='fixed' width={30} height={30} alt="userIcon" onClick={handleOpenCloseDrawer}/>
            <div className="headersMobileCenter">
            {state.showFilter?(
                <div className="headersMobileCenterSearchbar">
                    <input
                      name="searchBarValue"
                      className="inputNoneClase"
                      value={filters.headerText}
                      onChange={handleOnChange}
                      autoComplete="off"
                      placeholder="nombre del Juego"
                    />
                </div>
            ):(
                <Image src="/svg/umbrella.svg" layout='fixed' width={30} height={30} alt="userIcon"/>
            )}
            </div>
            <Image src={state.showFilter?"/svg/closeRed.svg":"/svg/lookForRed.svg"} layout='fixed' width={30} height={30} alt="userIcon" onClick={handleShowHideSearchbar}/>
        </div>
        
        
        {/* Drawer */}
        {state.showMenuDrawer&&(
        <>
        <div className="headerMobileDrawerExternal" onClick={handleOpenCloseDrawer}/>
        <div className="headerMobileDrawer animate__animated animate__fadeInLeft">
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
        </>
        )}
        
        
        </>
    )
}
