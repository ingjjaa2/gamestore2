import React,{useEffect,useState} from 'react';
import {useWindowSizeChange} from '../../hooks/useWindowSizeChange';
import GameWebView from '../../components/gameWeb';
import GameMobileView from '../../components/gameMobile';

import dbConnect from '../../db/mongo';
import {gameHandler} from '../../helper/igdb';
import Game from '../../db/models/game';

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
    const  client  = await dbConnect();
    const isConnected = client.connection.readyState;
    let _game =[];
    if(isConnected===1){
        _game = await Game.find({_id:id})
    }
    return {
        props:{id,_game:JSON.stringify(_game[0])},
        revalidate:20
    }
}



const Index = (props:any) => {

    const [game, setGame] = useState<any>(null);

    const {width}= useWindowSizeChange();

    
    useEffect(() => {
        const {_game} = props;
        setGame(JSON.parse(_game));
    }, [props])

    return (
        <>
        {width<600?(
            <GameMobileView gamePage={game}/>
        ):(
            <GameWebView gamePage={game}/>
        )}
        </>
    )
}

export default Index
