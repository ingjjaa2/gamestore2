import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useWindowSizeChange} from '../hooks/useWindowSizeChange';
import HomeWeb from '../components/homeWeb';
import HomeMobile from '../components/homeMobile';

const Index =(props:any)=>{

  const {width}= useWindowSizeChange();

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