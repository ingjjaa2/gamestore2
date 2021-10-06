import {Repository} from './repository';
import {gettAllGamesPlain,getOneGameById} from '../querry/game';

export interface game{
    id:string,
    name:string,
    detail:string,
    cardUrl:string,
    banneUrl:string,
    igdbID:number,
    isOnCd:Boolean,
    isOnDigital:Boolean,
    isNew:Boolean,
    ano:string,
    platform:string,
    precioVenta:string,
    start:number,
    images:string[],
    ratingA:number,
    ratingAcount:number,
    ratingB:number,
    ratingBcount:number,
    screenshots:string[],
    url:string,
    videos:string[],
}


class GameRepository extends Repository{
    
    async getAllGames():Promise<game[]>{
        const _gamesList:game[]=[];

        const rawRepo = await this.getAll("",gettAllGamesPlain);
        rawRepo?.forEach((x:any) => _gamesList.push({
            id:x._id,
            name:x.name,
            detail:x.detail,
            cardUrl:x.cardUrl,
            banneUrl:x.banneUrl,
            igdbID:x.igdbID,
            isOnCd:x.isOnCd,
            isOnDigital:x.isOnDigital,
            isNew:x.isNew,
            ano:x.ano,
            platform:x.platform,
            precioVenta:x.precioVenta,
            start:x.start,
            images:x.images,
            ratingA:x.ratingA,
            ratingAcount:x.ratingAcount,
            ratingB:x.ratingB,
            ratingBcount:x.ratingBcount,
            screenshots:x.screenshots,
            url:x.url,
            videos:x.videos            
        }));
        return _gamesList;
    }

    async getOneGame(id:string){

        const rawRepo = await this.getOne("",getOneGameById(id));

        const x = rawRepo.getGameById;

        if(x){
            const _game = {
                id:x._id,
                name:x.name,
                detail:x.detail,
                cardUrl:x.cardUrl,
                banneUrl:x.banneUrl,
                igdbID:x.igdbID,
                isOnCd:x.isOnCd,
                isOnDigital:x.isOnDigital,
                isNew:x.isNew,
                ano:x.ano,
                platform:x.platform,
                precioVenta:x.precioVenta,
                start:x.start,
                images:x.images,
                ratingA:x.ratingA,
                ratingAcount:x.ratingAcount,
                ratingB:x.ratingB,
                ratingBcount:x.ratingBcount,
                screenshots:x.screenshots,
                url:x.url,
                videos:x.videos            
            }
    
            return _game;
        }


    }

};



export const Games = new GameRepository("gamesList");