import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import {Games,game} from '../../Apollo/repo/game';
import {UserAdmin} from '../../Apollo/repo/user';
import {getGameDataById} from '../../helper/game';
import GameCard from '../../components/cards/game';

const Index = () => {

    const [state, setstate] = useState({searchBarValue:"",token:"",userValue:"",passwordValue:"",errorMesage:""});

    const [waitingServer, setWaitingServer] = useState(false);

    const [listGames, setListGames] = useState<game[]>([]);

    const [filteredListGames, setFilteredListGames] = useState<game[]>([]);

    const [activeGames, setActiveGames] = useState<game|undefined>();

    useEffect(() => {
        Games.getAllGames().then(x=>{
            setListGames(x)
        });        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Games])

    useEffect(() => {
        const _valueText = state.searchBarValue;
        let _listOfGames:game[]=[];

        if (_valueText.length>1){
            _listOfGames = listGames.filter(game=>{
                if(game.name.toLocaleLowerCase().includes(_valueText.toLowerCase())){
                    return true;
                }
                if(game.platform.toLocaleLowerCase().includes(_valueText.toLowerCase())){
                    return true;
                }
                if(game.typeGame.toLocaleLowerCase().includes(_valueText.toLowerCase())){
                    return true;
                }
                return false;
            })
        }else{
            _listOfGames = listGames
        }
        setFilteredListGames(_listOfGames)
    }, [listGames,state.searchBarValue])

    const handleOnCgange=(e:any)=>{
        setstate({...state,[e.target.name]:e.target.value});
    }

    const handleLogin=()=>{
        UserAdmin.logIn(state.userValue,state.passwordValue).then(x=>{
            if(x){
                setstate({...state,token:x,errorMesage:""});
            }else{
                setstate({...state,token:"",errorMesage:"Error Login"});
            }
        })
    }

    const handleLogOut=()=>{
        setstate({...state,token:"",errorMesage:""});
    }

    const handleClickEdit=(e?:game)=>{
        setActiveGames(e);
    }

    const handleOnAddNew=()=>{
        setActiveGames({
            name:"",
            detail:"",
            cardUrl:"",
            banneUrl:"",
            igdbID:0,
            isOnCd:false,
            isOnDigital:false,
            gameIsNew:false,
            ano:"",
            platform:"",
            typeGame:"",
            precioVenta:0,
            start:0,
            images:[],
            ratingA:0,
            ratingAcount:0,
            ratingB:0,
            ratingBcount:0,
            screenshots:[],
            url:"",
            videos:[],
        })
    }

    const handleOnSave=(e:game)=>{
        setWaitingServer(true);
        Games.createOneGame(e,state.token).then((x)=>{
            if(x){
                Games.getAllGames().then(x=>{
                    setActiveGames(undefined);
                    setListGames(x)}).finally(()=>{
                        setWaitingServer(false);
                    });   
            }
        }).finally(()=>{
            setWaitingServer(false);
        });
    }

    const handleDelete=(e:game)=>{

        if(e?.id){
            Games.deleteOneGame(e.id,state.token).then((x)=>{
                if(x){
                    Games.getAllGames().then(x=>{
                        setActiveGames(undefined);
                        setListGames(x);
                    }) 
                }
            });
        }

    }
    
    return (
        <>
        {state.token===""?(
            <div className="adminLoginScreenRoot">
            <div className="adminLoginScreen">
                <span className="adminLoginLogo">
                    <Image src="/images/logoWithName.png" alt="logo" layout="fixed" width={150} height={70}  />
                </span>
                {state.errorMesage!==""&&(
                <span className="errorMessageContainer">
                    {state.errorMesage}
                </span>
                )}
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
                          autoComplete="off"
                        />
                    </span>
                    <span className="adminPanelicon" onClick={handleOnAddNew}>
                        <Image src="/svg/addCds.svg" layout="fixed" width={20} height={20} alt="logOutIcon"/>
                    </span>
                </div>
            </div>
            {/* Lista de los juegos */}
            <div className="adminListGames scrollContainer">
                {filteredListGames.map((game,i)=>(
                    <span  key={i} className="cardItem">
                        <Image src={game.cardUrl} layout="fixed" width={120} height={120} alt="gameCard" />
                        <div className="cardItemCenterSection">
                            <span>{game.name}</span>
                            <span>{game.precioVenta} u$d</span>
                            <span>{game.platform}-{game.typeGame}</span>
                        </div>
                        <div className="cardItemRightSection">
                            <span className="buttonEdit" onClick={()=>handleClickEdit(game)}>Editar</span>
                            <span className="buttonDelete" onClick={()=>handleDelete(game)}>Borrar</span>
                        </div>
                    </span>
                    
                ))}
            </div>
        </div>
        )}
        {activeGames&&(
            <ModalEditCreate activeGame={activeGames} onCloseModal={()=>handleClickEdit()} onSave={handleOnSave} saving={waitingServer}/>
        )}
        </>
    )
}

export default Index

const ModalEditCreate=({activeGame,onCloseModal,onSave,saving}:{activeGame:game,onCloseModal:any,onSave:any,saving:boolean})=>{

    const [state, setstate] = useState({searchBarValue:"",step:1,isEditing:false,loading:false});

    const [listOfPossiblesGames, setListOfPossiblesGames] = useState<any[]>([]);

    const [editingGame, setEditingGame] = useState<any>();

    const [images, setImages] = useState<string[]>([])


    useEffect(() => {
        if(activeGame?.id){
            setstate({searchBarValue:"",step:3,isEditing:true,loading:false});
            const _game ={...activeGame,isOnCd:activeGame?.isOnCd?'si':'no',gameIsNew:activeGame?.gameIsNew?'si':'no'};
            setEditingGame(_game);
            // setEditingGame(activeGame)
            setImages([...activeGame.images,...activeGame.screenshots])
        }else{
            setstate({searchBarValue:"",step:1,isEditing:false,loading:false});
            setImages([]);
            setEditingGame({
                name:"",
                detail:"",
                cardUrl:"",
                banneUrl:"",
                igdbID:0,
                isOnCd:false,
                isOnDigital:false,
                gameIsNew:false,
                ano:"",
                platform:"",
                precioVenta:"",
                start:0,
                images:[],
                ratingA:0,
                ratingAcount:0,
                ratingB:0,
                ratingBcount:0,
                screenshots:[],
                url:"",
                videos:[],
            })
        }
    }, [activeGame])

    const handleChangeStep=(e:number)=>{
        if(e>0){
            setstate({...state,step:e});
        }
    }

    const handleOnChange=(e:any)=>{
        e.preventDefault();
        setstate({...state,[e.target.name]:e.target.value});
    }

    const handleOnkeyPress=(e:any)=>{
        if(e.key==='Enter'){
            if(state.searchBarValue!==""){
                setstate({...state,loading:true});
                Games.getAllGames()
                getGameDataById(state.searchBarValue).then(x=>{
                    setListOfPossiblesGames(x);
                }).catch(error=>{
                    console.log({nopaso:true,error});
                }).finally(()=>{
                    setstate({...state,loading:false});
                })
            }
        }
    }

    const handleOnSelectgame=(e:game)=>{
        setstate({...state,step:3});
        const _game ={...e,isOnCd:e?.isOnCd?'si':'no',gameIsNew:e?.gameIsNew?'si':'no'};
        setEditingGame(_game);
        setImages([...e.images,...e.screenshots])
    }

    const handleOnChangeValueOfActiveGame=(e:any)=>{
       
        
        if(e.target){
            setEditingGame({...editingGame,[e.target.name]:e.target.value});
        }if(e.nextImage){
            // La accion viene de hacer click en una flecha
            let  newActiveImage = "";
            const activeindex = images.indexOf(editingGame?.[e.name]);
            if(e.nextImage>0&&(activeindex<(images.length-1))){
                newActiveImage = images[activeindex+1];
            }
            if(e.nextImage<0&&(activeindex>0)){
                newActiveImage = images[activeindex-1];
            }
            setEditingGame({...editingGame,[e.name]:newActiveImage});
        }else{
            setEditingGame({...editingGame,[e.name]:e.value});
        }
    }

    const handleOnSave=()=>{

        const _game=({...editingGame,
                        isOnCd:editingGame?.isOnCd==='si'?true:false,
                        gameIsNew:editingGame?.gameIsNew==='si'?true:false})

        onSave(_game);
    }

    return (
        <>
        <div className="adminModalExternalContainer" onClick={onCloseModal}/>
        <div className="adminModalRoot">
            {saving?(
                <div className="modalWaitingContainer">
                    <Image src="/gift/loading.gif" layout="fixed" width={230} height={230} alt="waiting"/>
                </div>
            ):(
            <>
             <div className="adminModalHeader">
                    <span className="adminModalHeaderIcon" onClick={()=>handleChangeStep(1)}>
                        {(state.step>1&&state.isEditing!==true)&&(
                            <Image src="/svg/chevronLeft.svg" alt="image" layout="fixed" width={17} height={17}  />
                        )}
                    </span>
                    <span className="adminModalHeaderText">{state.isEditing?"Editando el Juego":"Crear Nuevo Juego"}</span>
                    <span className="adminModalHeaderIcon" onClick={onCloseModal}>
                        <Image src="/svg/close.svg" alt="image" layout="fixed" width={22} height={22}  />
                    </span>
            </div>
            <div className="adminModalInfo">
            {state.step===1&&(<Step1 handleChangeStep={handleChangeStep}/>)}
            {state.step===2&&(<Step2 state={state} handleOnChange={handleOnChange} handleOnkeyPress={handleOnkeyPress} listOfPossiblesGames={listOfPossiblesGames} handleOnSelectgame={handleOnSelectgame}/>)}
            {(state.step===3&&editingGame)&&(<Step3 game={editingGame} handleOnChange={handleOnChangeValueOfActiveGame}/>)}
            </div>
            <div className="adminModalButtons">
                <span className="adminModalSaveButton" onClick={handleOnSave}>
                    Guardar
                </span>
            </div>
            </>
            )}
            </div>
        </>
    )
}


const Step1=({handleChangeStep}:{handleChangeStep:any})=>{
    return(
        <>
        <div className="modalAdminOption" onClick={()=>handleChangeStep(2)}>
            <Image src="/svg/cloudCatalog.svg" alt="image" layout="fixed" width={40} height={40}  />
            <span>
                Crear usando el catalogo de Juegos Online
            </span>
        </div>
        {/* <div className="modalAdminOption" onClick={()=>handleChangeStep(3)}>
            <Image src="/svg/edit.svg" alt="image" layout="fixed" width={40} height={40}  />    
            <span>
                Crear desde cero
            </span>
        </div> */}
        </>
    )
}


const Step2=({state,handleOnChange,handleOnkeyPress,listOfPossiblesGames,handleOnSelectgame}:{state:any,handleOnChange:any,handleOnkeyPress:any,listOfPossiblesGames:any,handleOnSelectgame:any})=>{
    
    return(
        <>
        <div className="modalAdminSearchBar">
            <input
                autoComplete="off"
                name="searchBarValue"
                className="inputNoneClase"
                value={state.searchBarValue}
                onChange={handleOnChange}
                onKeyDown={handleOnkeyPress}
                placeholder="Ingresa un nombre para consultar"
            />
        </div>
        <div className="modalAdminListofGames scrollContainer">
            {state.loading?(
                <div className="waitingImage">
                    <Image src="/gift/loading.gif" layout="fixed" width={230} height={230} alt="waiting"/>
                </div>
            ):(
                <>
                {listOfPossiblesGames.length>0?(
                    <>
                    {listOfPossiblesGames.map((x:any,i:number)=>{

                       let url='/images/gameNoImage.png';
                       let bannerUrl='/images/gameNoImage.png'

                        let date:any =""

                        if(x.images.length>0){
                            url = x.images[0];
                            bannerUrl = x.images[0];
                        }else if(x.screenshots.length>0){
                            url = x.screenshots[0];
                            bannerUrl = x.screenshots[0];
                        }
                        const _date = new Date(0);
                        _date.setUTCSeconds(x.realeaseTime);
                        if(!isNaN(_date.getFullYear())){
                            date = _date.getFullYear()
                        }

                        const _game:game= {
                            name:x.name,
                            detail:x.summary,
                            cardUrl:url,
                            banneUrl:bannerUrl,
                            igdbID:x.id,
                            isOnCd:false,
                            isOnDigital:false,
                            gameIsNew:false,
                            ano:date,
                            platform:"",
                            typeGame:"",
                            precioVenta:0,
                            start:0,
                            images:x.images,
                            ratingA:x.ratingA,
                            ratingAcount:x.ratingAcount,
                            ratingB:x.ratingB,
                            ratingBcount:x.ratingBcount,
                            screenshots:x.screenshots,
                            url:x.url,
                            videos:x.videos,
                        }

                       
                        return(
                            <span key={i} onClick={()=>handleOnSelectgame(_game)}>
                                <GameCard game={_game} /> 
                            </span>
                        )
                    })}
                    </>
                ):(
                    <span>No hay Coincidencias</span>
                )}
            </>
            )}
        </div>
        </>
    )
}

const fields=[
    {tag:"name",label:"Nombre",type:"text",options:[]},
    {tag:"detail",label:"Detalles",type:"textArea",options:[]},
    {tag:"cardUrl",label:"Imagen Tarjeta",type:"cardImage",options:[]},
    {tag:"banneUrl",label:"Banner",type:"banneUrl",options:[]},
    {tag:"igdbID",label:"igdbID",type:"number",options:[]},
    {tag:"isOnCd",label:"CD Fisico",type:"options",options:['si','no']},
    {tag:"gameIsNew",label:"Es nuevo",type:"options",options:['si','no']},
    {tag:"ano",label:"Año",type:"number",options:[]},
    {tag:"platform",label:"plataforma",type:"options",options:['','ps4','pc','ps3','switch','xbox']},
    {tag:"typeGame",label:"Tipo Juego",type:"options",options:['','Deportes','Carrera','Accion','Niños','RGP','Disparos']},
    {tag:"precioVenta",label:"Precio Venta",type:"number",options:[]},
    {tag:"start",label:"Estrellas",type:"number",options:[]},
    // {tag:"images",label:"Imagenes",type:"ListOfFiles",options:[]},
    {tag:"ratingA",label:"Rating A",type:"number",options:[]},
    {tag:"ratingB",label:"Rating B",type:"number",options:[]},
    // {tag:"screenshots",label:"Screenshots",type:"ListOfFiles",options:[]},
    {tag:"url",label:"Web Del juego",type:"text",options:[]},
    // {tag:"videos",label:"Videos",type:"ListOfFiles",options:[]}
]

const Step3=({game,handleOnChange}:{game:any,handleOnChange:any})=>{

    return(
        <div className="modalAdminEditGames scrollContainer">
            {fields.map((x:any,i:number)=>{


                switch (x.type) {
                    case "cardImage":
                        return(
                            <CustomBannerUrl field={x} game={game} onChange={handleOnChange} key={i} isCard={true}/>
                        ); 

                    case "banneUrl":
                        return(
                            <CustomBannerUrl field={x} game={game} onChange={handleOnChange} key={i}/>
                        );                       

                    case "options":
                        return(
                            <CustomSelect field={x} value={game[x.tag]} onChange={handleOnChange} key={i}/>
                        );
                
                    default:
                        return(
                            <CustomInput field={x} value={game[x.tag]} onChange={handleOnChange} key={i}/>
                        );
                }               

            })}
        </div>
    )
}

const CustomInput=({field,value,onChange}:{field:any,value:any,onChange:any})=>{


    const handleOnChange=(e:any)=>{
        if(onChange){
            onChange({value:e.target.value,name:e.target.name})
        }
    }

    return (
        <div className="modalAdminInputCustomContainer">
            <span className="modalAdminInputCustomlabel">{field.label}</span>
            {field.type==="textArea"?(
                <textarea
                autoComplete="off"
                name={field.tag}
                className="inputNoneClase"
                rows={5}
                value={value}
                onChange={handleOnChange}
                />
            ):(
                <input
                autoComplete="off"
                name={field.tag}
                className="inputNoneClase"
                type={field.type}
                value={value}
                onChange={handleOnChange}
                />
            )}

        </div>
    );
}

const CustomSelect=({field,value,onChange}:{field:any,value:any,onChange:any})=>{

    const handleOnChange=(e:any)=>{
        if(onChange){
            onChange({value:e.target.value,name:e.target.name})
        }
    }

    return (
        <div className="modalAdminInputCustomContainer">
            <span className="modalAdminInputCustomlabel">{field.label}</span>
            <select name={field.tag} onChange={handleOnChange} value={value} className="modalCustomSelect">
                    {field.options.map((y:any,i:number)=>(<option key={i} value={y}>{y}</option>))}
            </select>  
        </div>
    );
}

const CustomBannerUrl=({field,game,onChange,isCard=false}:{field:any,game:any,onChange:any,isCard?:Boolean})=>{

    const [url, setUrl] = useState('/images/gameNoImage.png')

    useEffect(() => {
        if(game?.banneUrl!==""){
            setUrl(game[field.tag]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game])
    
    
    const handleOnChange=(e:any)=>{
        onChange({nextImage:e,name:field.tag})
    }


    return(
        <div className="modalCustomImagebanerSection">
              <span className="modalAdminInputCustomlabel">{field.label}</span>
             <span className="modalCustomImagebanerSectionArrows">
                 <span className="arrowicon" onClick={()=>handleOnChange(-1)}>
                     <Image src="/svg/chevronLeft.svg" alt="image" layout="fixed" width={14} height={14}  />
                 </span>
             </span>
                {isCard?(
                    <div className="modalCustomImageCardExternal">
                        <div className="modalCustomImageCardImage" style={{backgroundImage:`url('${url}')`}}/>
                    </div>
                ):(
                    <div className="modalCustomImagebanerImage" style={{backgroundImage:`url('${url}')`}}/>
                )}
             <span className="modalCustomImagebanerSectionArrows">
                <span className="arrowicon" onClick={()=>handleOnChange(1)}>
                    <Image src="/svg/chevronRight.svg" alt="image" layout="fixed" width={14} height={14}  />
                </span>
             </span>
        </div>
    );
}