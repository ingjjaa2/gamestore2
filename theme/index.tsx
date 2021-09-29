import React,{useContext,useEffect,useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {AppContext} from '../context/appContext';


interface Props{
    children:any,
    showHeader?:boolean,
    showFooter?:boolean,
}

const AppLayout = ({children}:Props) => {

    const {alertMessage,setAlertMessage} = useContext(AppContext);

    const handleHideMessage=()=>{
        setAlertMessage({message:"",show:false,type:'info'});
    }

    return (
        <>
        <Head>
            <title>UmbrellaCorp</title>
            <meta name="description" content="Task" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="">
            {children}
        </main>
        {alertMessage.show&&(
            <div className={`snackbarContainer ${alertMessage.type==="info"&&"snackbarInfo"} ${alertMessage.type==="error"&&"snackbarRed"} ${alertMessage.type==="success"&&"snackbarSuccess"}`}>
                {alertMessage.message}
                <span className="snackbarContainerClose" onClick={handleHideMessage}>
                    <Image src="/svg/close.svg" width={7} height={7} alt="searchTag" layout="fixed"/>
                </span>
            </div>
        )}

        </>
    )
}

export default AppLayout;