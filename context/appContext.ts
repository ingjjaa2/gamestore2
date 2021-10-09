import {createContext,useState,useEffect} from 'react';
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
    const [filteredListGames, setFilteredListGames] = useState<game[]>();

    const [filters, setFilters] = useState({headerText:"",typeOfGame:"",platform:"",isOnCd:false});

    useEffect(() => {
        const _valueText = filters.headerText;
        let _listOfGames:game[]|undefined=listGames;
        
        if(filters.isOnCd){
            _listOfGames=_listOfGames?.filter(game=>game.isOnCd===true);
        }

        if(filters.platform!==""){
            _listOfGames=_listOfGames?.filter(game=>game.platform===filters.platform);
        }

        if(filters.typeOfGame!==""){
            _listOfGames=_listOfGames?.filter(game=>game.typeGame===filters.typeOfGame);
        }

        if(_valueText.length>1){
            _listOfGames = _listOfGames?.filter(game=>{
                if(game.name.toLocaleLowerCase().includes(_valueText.toLowerCase())){
                    return true;
                }
                return false;
            })
        }
        
        setFilteredListGames(_listOfGames)
    }, [filters,listGames]);

    const handleChangeFileters=({tag,value}:{tag:'headerText'|'typeOfGame'|'platform'|'isOnCd',value:any})=>{
        setFilters({...filters,[tag]:value})
    }



    return {
        alertMessage, setAlertMessage,
        listGames, setListGames,
        filters, handleChangeFileters,
        filteredListGames,
    }
}