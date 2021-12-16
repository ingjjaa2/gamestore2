import React,{useEffect,useState} from 'react';
import {useWindowSizeChange} from '../../hooks/useWindowSizeChange';
import GameWebView from '../../components/gameWeb';
import GameMobileView from '../../components/gameMobile';

import dbConnect from '../../db/mongo';
import {gameHandler} from '../../helper/igdb';


export async function getStaticPaths(){

    const  client  = await dbConnect();

    const isConnected = client.connection.readyState;
    let _listofgame:any = [];
    let _paths:any = [];

    if(isConnected===1){
      _listofgame = await gameHandler();
      for (let index = 0; index < _listofgame?.data.length; index++) {
          const game = _listofgame?.data[index];
          _paths.push({params:{id:`${game?.id}`}})
        }
    }

    return {
        paths:_paths,
        fallback:true,
    }
}


export async function getStaticProps(context:any){
    const { params } = context
    const { id } = params
    return {
        props:{id}
    }
}



const Index = (props:any) => {

    const [gameID, setGameID] = useState('0');

    const {width}= useWindowSizeChange();

    
    useEffect(() => {
        const {id} = props;
        setGameID(id);
    }, [props])

    return (
        <>
        {width<600?(
            <GameMobileView gameId={gameID}/>
        ):(
            <GameWebView gameId={gameID}/>
        )}
        </>
    )
}

export default Index
