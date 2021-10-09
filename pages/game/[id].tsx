import React,{useEffect,useState} from 'react';
import {useWindowSizeChange} from '../../hooks/useWindowSizeChange';
import GameWebView from '../../components/gameWeb';
import GameMobileView from '../../components/gameMobile';

export async function getStaticPaths(){

    // aqui va la funcion que saca todos los juegos 


    return {
        paths:[
            {params:{id:'1'}}
        ],
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
