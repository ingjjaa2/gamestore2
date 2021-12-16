import {Repository} from './repository';
import {gettAllGamesPlain,getOneGameById,createGame,deleteGame} from '../querry/game';

export interface game{
    id?:string,
    name:string,
    detail:string,
    cardUrl:string,
    banneUrl:string,
    igdbID:number,
    isOnCd:Boolean,
    isOnDigital:Boolean,
    gameIsNew:Boolean,
    ano:string,
    platform:string,
    typeGame:string,
    precioVenta:number,
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

        console.log(rawRepo);

        rawRepo?.getAllGame?.forEach((x:any) => _gamesList.push({
            id:x._id,
            name:x?.name||"",
            detail:x?.detail||"",
            cardUrl:x?.cardUrl||"",
            banneUrl:x?.banneUrl||"",
            igdbID:x?.igdbID||0,
            isOnCd:x?.isOnCd||false,
            isOnDigital:x?.isOnDigital||false,
            gameIsNew:x?.gameIsNew||false,
            ano:x?.ano||"",
            platform:x?.platform||"ps4",
            typeGame:x?.typeGame||"",
            precioVenta:x?.precioVenta||0,
            start:x?.start||0,
            images:x?.images||[],
            ratingA:(x.ratingA!==undefined?x.ratingA:0),
            ratingAcount:(x.ratingAcount!==undefined?x.ratingAcount:0),
            ratingB:(x.ratingB!==undefined?x.ratingB:0),
            ratingBcount:(x.ratingBcount!==undefined?x.ratingBcount:0),
            screenshots:x.screenshots||[],
            url:x?.url||"",
            videos:x?.videos||[]             
        }));
        return _gamesList;
    }

    async getAllGamesByName():Promise<game[]>{
        const _gamesList:game[]=[];

        const rawRepo = await this.getAll("",gettAllGamesPlain);

        rawRepo?.forEach((x:any) => _gamesList.push({
            id:x._id,
            name:x?.name||"",
            detail:x?.detail||"",
            cardUrl:x?.cardUrl||"",
            banneUrl:x?.banneUrl||"",
            igdbID:x?.igdbID||0,
            isOnCd:x?.isOnCd||false,
            isOnDigital:x?.isOnDigital||false,
            gameIsNew:x?.gameIsNew||false,
            ano:x?.ano||"",
            platform:x?.platform||"ps4",
            typeGame:x?.typeGame||"",
            precioVenta:x?.precioVenta||0,
            start:x?.start||0,
            images:x?.images||[],
            ratingA:(x.ratingA!==undefined?x.ratingA:0),
            ratingAcount:(x.ratingAcount!==undefined?x.ratingAcount:0),
            ratingB:(x.ratingB!==undefined?x.ratingB:0),
            ratingBcount:(x.ratingBcount!==undefined?x.ratingBcount:0),
            screenshots:x.screenshots||[],
            url:x?.url||"",
            videos:x?.videos||[]             
        }));
        return _gamesList;
    }

    async getOneGame(id:string){

        const rawRepo = await this.getOne("",getOneGameById(id));

        const x = rawRepo.getGameById;

        if(x){

            const _game = {
                id:x._id,
                name:x?.name||"",
                detail:x?.detail.replace(/(\r\n|\n|\r)/gm, "")||"",
                cardUrl:x?.cardUrl||"",
                banneUrl:x?.banneUrl||"",
                igdbID:x?.igdbID||0,
                isOnCd:x?.isOnCd||false,
                isOnDigital:x?.isOnDigital||false,
                gameIsNew:x?.gameIsNew||false,
                ano:x?.ano||"",
                platform:x?.platform||"ps4",
                typeGame:x?.typeGame||"",
                precioVenta:x?.precioVenta||0,
                start:x?.start||0,
                images:x?.images||[],
                ratingA:x.ratingA||0,
                ratingAcount:x.ratingAcount||0,
                ratingB:x.ratingB||0,
                ratingBcount:x.ratingBcount||0,
                screenshots:x.screenshots||[],
                url:x?.url||"",
                videos:x?.videos||[]            
            }
    
            return _game;
        }


    }

    async createOneGame(game:game,token:string){

        const rawRepo = await this.createOne(token,createGame(game));

        if(rawRepo){
            return true
        }
    }

    async deleteOneGame(idString:string,token:string){

        const rawRepo = await this.deleteOne(token,deleteGame(idString));
  
        if(rawRepo){
            return true
        }
    }
    

};



export const Games = new GameRepository("gamesList");