import {Repository} from './repository';

export interface game{
    id:string,
    name:string,
    imageUrl:string,
    igdbID:number,
    isOnCd:Boolean,
    isOnDigital:Boolean,
    isNew:Boolean,
    platform:string,
    start:number
}


class GameRepository extends Repository{
    
    async getAllGames():Promise<game[]>{
        const _gamesList:game[]=[];
        this.getAll().then((rawRepo:any)=>{
            rawRepo?.forEach((x:any) => _gamesList.push({
                id:x.id,
                name:x.name,
                imageUrl:x.imageUrl,
                igdbID:x.igdbID,
                isOnCd:x.isOnCd,
                isOnDigital:x.isOnDigital,
                isNew:x.isNew,
                platform:x.platform,
                start:x.start
                
            }));
        })
        return _gamesList;
    }


};



export const Games = new GameRepository("gamesList");