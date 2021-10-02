import React,{useState} from 'react'
import Image from 'next/image';


const headerOptions=[
    {id:"games",title:"Juegos"},
    {id:"subscriptions",title:"Subscripciones"},
    {id:"services",title:"Servicios"}
];


export const HeaderWeb = () => {

    const [state, setstate] = useState({searchBarValue:"",activeMenu:'games'})

    const handleOnCgange=(e:any)=>{
        setstate({...state,[e.target.name]:e.target.value});
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
                  value={state.searchBarValue}
                  onChange={handleOnCgange}
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


export const HeaderMobile = () => {
    return (
        <div>
            Header Mobile
        </div>
    )
}
