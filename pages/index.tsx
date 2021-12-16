import type { NextPage } from 'next'
import {useContext,useEffect} from 'react';
import {useWindowSizeChange} from '../hooks/useWindowSizeChange';
import HomeWeb from '../components/homeWeb';
import HomeMobile from '../components/homeMobile';

import {AppContext} from '../context/appContext';
import {Games,} from '../Apollo/repo/game';

const Index =(props:any)=>{

  const {width}= useWindowSizeChange();

  const {setListGames} = useContext(AppContext);

  useEffect(() => {
    Games.getAllGames().then(x=>{
        console.log(x);
        setListGames(x)});        
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [Games])

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