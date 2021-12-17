import type { NextPage } from 'next'
import {useContext,useEffect} from 'react';
import {useWindowSizeChange} from '../hooks/useWindowSizeChange';
import HomeWeb from '../components/homeWeb';
import HomeMobile from '../components/homeMobile';

import {AppContext} from '../context/appContext';
import {gameHandler} from '../helper/igdb';
import dbConnect from '../db/mongo';


export async function getStaticProps(context:any){
  const  client  = await dbConnect();

  const isConnected = client.connection.readyState;
  let _listofgame:any = {data:[]};

  if(isConnected===1){
    _listofgame = await gameHandler();
  }

  return {
    props: { listofgame : JSON.stringify(_listofgame?.data) },
    revalidate:20
  }
}


const Index =(props:any)=>{

  const {width}= useWindowSizeChange();

  const {setListGames} = useContext(AppContext);

  useEffect(() => {
    const {listofgame} = props;
    setListGames(JSON.parse(listofgame));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    {width<600?(
        <HomeMobile/>
      ):(
        <HomeWeb/>
    )}
    </>
  );
}


export default Index;