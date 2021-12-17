import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import {generarJWT,comprobarJWT} from '../../helper/jwt';
import Usuario from '../../db/models/usuarios';
import Game from '../../db/models/game';


const handleLogin=async(data:any)=>{

        try {
            const {email,password} = data;
            const usuarioDB = await Usuario.findOne({ email });
            if(!usuarioDB){
                return null;
            }else{
                const validPassword = bcrypt.compareSync( password, usuarioDB.password );
                if ( validPassword ) {
                    const token = await generarJWT( usuarioDB._id );
                    return {
                        online:usuarioDB?.online,
                        userType:usuarioDB?.userType,
                        _id:usuarioDB?._id,
                        name:usuarioDB?.name,
                        email:usuarioDB?.email,
                        token:token
                    };
                }else{
                    return null
                }
            }
        
        } catch (error) {
            console.log("=========esta en error de authUser================");
            console.log(error);
            return null;
        }
}

const handleValidateToken=async(token:any)=>{
    try {
        const authState = comprobarJWT(token);
        // console.log({authState})
        // if(authState.ok){
        //     const payload= authState.payload;
        //     const usuarioDB = await Usuario.findById(payload);
        //     const token = await generarJWT( usuarioDB._id );
        //     usuarioDB.token = token;
        //     return usuarioDB;
        // }else{
        //     console.log("Token no valido")
        //     return null;
        // }
        // const usuarioDB = await Usuario.findOne({ email });

    
    } catch (error) {
        console.log("=========esta en error de authUser================");
        console.log(error);
        return null;
    }
}

const handleDeleteGame=async(data:any)=>{
    try {
        const authState = {ok:true};        
        if(authState.ok){
            const {id} = data;
            await Game.findByIdAndDelete(id);
            return true;
       }else{
           console.log("usuario no valido");
           return null;
       }
    } catch (error) {
        
    }
}

const handleAddGame=async(data:any)=>{
    try {
        const authState = {ok:true};

        if(authState.ok){
            const _element = {...data};
            let newGame = null;
            if(_element.hasOwnProperty('id')&&_element?.id!=="undefined"){
                const _updateInputs ={...data};
                delete _updateInputs._id;
                newGame = await Game.findByIdAndUpdate(data.id,_updateInputs,{new:true});
            }else{
                const _createInputs ={...data};
                delete _createInputs._id;
                newGame = new Game(_createInputs);
                await newGame.save();
            }
            return newGame;
        }else{
            console.log("usuario no valido");
            return null;
        }
        
    } catch (error) {
        console.log("=========esta en error de createGame================");
        console.log(error);
        return null; 
    }
}

const handleGetAllgames=async()=>{
    try {
        const _gamesList:any[]=[];
        const gameList = await Game.find({});
        gameList?.forEach((x:any) => _gamesList.push({
            id:x._id,
            name:x?.name||"",
            detail:x?.detail||"",
            cardUrl:x?.cardUrl||"",
            banneUrl:x?.banneUrl||"",
            igdbID:x?.igdbID||0,
            isOnCd:x?.isOnCd||false,
            isOnDigital:x?.isOnDigital||false,
            gameIsNew:x?.gameIsNew||false,
            ano:x?.ano||"",
            platform:x?.platform||"ps4",
            typeGame:x?.typeGame||"",
            precioVenta:x?.precioVenta||0,
            start:x?.start||0,
            images:x?.images||[],
            ratingA:(x.ratingA!==undefined?x.ratingA:0),
            ratingAcount:(x.ratingAcount!==undefined?x.ratingAcount:0),
            ratingB:(x.ratingB!==undefined?x.ratingB:0),
            ratingBcount:(x.ratingBcount!==undefined?x.ratingBcount:0),
            screenshots:x.screenshots||[],
            url:x?.url||"",
            videos:x?.videos||[]             
        }));
        return _gamesList
    } catch (error) {
        console.log("usuario no valido");
        return null;
    }
}

const handleGetGameById=async(_id:any)=>{

    try {
        if(_id!=='0'){
            const gameList = await Game.find({_id});
            return gameList[0]
        }
    } catch (error) {
        return []
    }
   
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const {action,data} = req.body;

   const token=req.headers["x-token"]

//   const validatedToken = handleValidateToken(token);
//    const validatedToken = true;
   
//    console.log({token,validatedToken})

    switch (action) {
        case "login":
            const response = await handleLogin(data);
            res.status(200).json(response);
            break;

        case "addGame":
            const responseGame = await handleAddGame(data);
            res.status(200).json(responseGame);
            break;

        case "deleteGame":
            const responseDeleteGame = await handleDeleteGame(data);
            res.status(200).json(responseDeleteGame);
            break;

        case "listOfgames":
            const responseListOfgames = await handleGetAllgames();
            res.status(200).json(responseListOfgames);
            break;

        case "getGameById":
            const responseGameById = await handleGetGameById(data);
            res.status(200).json(responseGameById);
            break;
    
        default:
            console.log(`accion no reconocida : ${data}`)
            res.status(200).json(null);
            break;
    }
}