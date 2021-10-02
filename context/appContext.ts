import {createContext,useState} from 'react';
import {useRouter} from 'next/router';
import {game} from '../Apollo/repo/game';

export const AppContext = createContext({} as ReturnType<typeof useContextValue>);

interface MessageProp{
    message:string,
    type:'info'|'error'|'success',
    show:boolean
}

export const useContextValue=()=>{

    const [alertMessage, setAlertMessage] = useState<MessageProp>({message:"",type:'info',show:false});
    const [activeUser, setActiveUser] = useState<any>();

    const [listGames, setListGames] = useState<game[]>();


    return {
        alertMessage, setAlertMessage,
        listGames, setListGames
    }
}