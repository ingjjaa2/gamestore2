import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import {Games,game} from '../../Apollo/repo/game';
import {UserAdmin} from '../../Apollo/repo/user';

const Index = () => {

    const [state, setstate] = useState({searchBarValue:"",token:"",userValue:"",passwordValue:""});

    const [listGames, setListGames] = useState<game[]>([]);

    const [activeGames, setActiveGames] = useState<game|undefined>();

    useEffect(() => {
        Games.getAllGames().then(x=>{
            setListGames(x)});        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Games])

    const handleOnCgange=(e:any)=>{
        setstate({...state,[e.target.name]:e.target.value});
    }

    const handleLogin=()=>{
        UserAdmin.logIn(state.userValue,state.passwordValue).then(x=>{
            setstate({...state,token:x});
        })
    }

    const handleLogOut=()=>{
        setstate({...state,token:""});
    }

    const handleClickEdit=(e?:game)=>{
        setActiveGames(e);
    }
    
    return (
        <>
        {state.token===""?(
            <div className="adminLoginScreen">
                <span className="adminLoginLogo">
                    <Image src="/images/logoWithName.png" alt="logo" layout="fixed" width={150} height={70}  />
                </span>
                <span className="adminLoginInput">
                    <input
                      name="userValue"
                      className="inputNoneClase"
                      value={state.userValue}
                      onChange={handleOnCgange}
                    />
                </span>
                <span className="adminLoginInput">
                    <input
                      name="passwordValue"
                      className="inputNoneClase"
                      value={state.passwordValue}
                      onChange={handleOnCgange}
                      type="password"
                    />
                </span>
                <span className="adminLoginButton" onClick={handleLogin} >Button</span>
            </div>
        ):(
         <div className="adminPanelRoot">
            {/* Header */}
            <div className="adminPanelButtons">
                <div>
                    <span className="adminPanelicon" onClick={handleLogOut}>
                        <Image src="/svg/logOut.svg" layout="fixed" width={18} height={18} alt="logOutIcon" />
                    </span>

                </div>
                <div className="adminPanelButtonsRightIcons">
                    {/* SearchBar */}
                    <span className="searchBarAdmin">
                        <input
                          name="searchBarValue"
                          className="inputNoneClase"
                          value={state.searchBarValue}
                          onChange={handleOnCgange}
                        />
                    </span>
                    <span className="adminPanelicon">
                        <Image src="/svg/addCds.svg" layout="fixed" width={20} height={20} alt="logOutIcon" />
                    </span>
                </div>
            </div>
            {/* Lista de los juegos */}
            <div className="adminListGames scrollContainer">
                {listGames.map((game,i)=>(
                    <span  key={i} className="cardItem">
                        <Image src={game.cardUrl} layout="fixed" width={120} height={120} alt="gameCard" />
                        <div className="cardItemCenterSection">
                            <span>{game.name}</span>
                            <span>{game.precioVenta} u$d</span>
                            <span>{game.platform}</span>
                        </div>
                        <div className="cardItemRightSection">
                            <span className="buttonEdit" onClick={()=>handleClickEdit(game)}>Editar</span>
                            <span className="buttonDelete">Borrar</span>
                        </div>
                    </span>
                    
                ))}
            </div>
        </div>
        )}
        {activeGames&&(
        <>
        <div className="adminModalExternalContainer" onClick={()=>handleClickEdit()}/>
        <div className="adminModalRoot">
            <div className="adminModalInfo scrollContainer">
            
            </div>
            <div className="adminModalButtons">
                <span className="adminModalSaveButton">
                    Guardar
                </span>
            </div>
        </div>
        </>
        )}
        </>
    )
}

export default Index
