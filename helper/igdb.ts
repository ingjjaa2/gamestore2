import GameModel from '../db/models/game';

let clientId="g8br273u27qer0z5bool5aff5aykyz";
let client_secret="5l2hdxsejg9eksarjwdfmb1jvidxlt";
let grant_type="client_credentials"
let accessToken="";
let expires_in=new Date();


const _login=async()=>{
    const _date = new Date;
    const rawResponse = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${client_secret}&grant_type=${grant_type}`,{method:'POST'});
    const response = await rawResponse.json();
    _date.setSeconds(_date.getSeconds()+response.expires_in);
    expires_in = _date;
    accessToken = response.access_token
    return true;
}


const _getGameExtraInfo=async(gameID:any)=>{

    const _screenShoots:any[]=[];
    const _videos:any[]=[];
    const _images:any[]=[];

    const imagesRawResponse = await fetch('https://api.igdb.com/v4/artworks',
    {
        method:'POST',
        headers:{
            Accept: 'application/json',
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
        },
        body:`fields *; where game = ${gameID};`
    });

    const images = await imagesRawResponse.json();

    for (let index = 0; index < images.length; index++) {
        const element = images[index];
        const _url= `http:${element.url.toString().replace('thumb','screenshot_big')}`
        _images.push(_url);        
    }

    const screenshotsRawResponse = await fetch('https://api.igdb.com/v4/screenshots',
    {
        method:'POST',
        headers:{
            Accept: 'application/json',
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
        },
        body:`fields *; where game = ${gameID};`
    });

    const screenshots = await screenshotsRawResponse.json();

    for (let index = 0; index < screenshots.length; index++) {
        const element = screenshots[index];
        const _url= `http:${element.url.toString().replace('thumb','screenshot_big')}`
        _screenShoots.push(_url);        
    }

    const videosRawResponse = await fetch('https://api.igdb.com/v4/game_videos',
    {
        method:'POST',
        headers:{
            Accept: 'application/json',
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
        },
        body:`fields *; where game = ${gameID};`
    });

    const videos = await videosRawResponse.json();

    for (let index = 0; index < videos.length; index++) {
        const element = videos[index];
        const _url= `https://www.youtube.com/watch?v=${element.video_id}`
        _videos.push(_url);        
    }

    return {_screenShoots,_videos,_images}
}

const _getGamesByName=async(gameID:any)=>{

    let gameListWithData=[];

    const gameRawResponse = await fetch('https://api.igdb.com/v4/games',
    {
        method:'POST',
        headers:{
            Accept: 'application/json',
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
        },
        body:`search "${gameID}"; fields *;`
    }); 

    const gameList = await gameRawResponse?.json();

    for (let index = 0; index < gameList.length; index++) {
        const game = gameList[index];
        const {_screenShoots,_videos,_images} = await _getGameExtraInfo(game.id);
        const response ={
            id:game?.id,
            name:game?.name||"",
            ratingA:game?.aggregated_rating||0,
            ratingAcount:game?.aggregated_rating_count||0,
            ratingB:game?.total_rating||0,
            ratingBcount:game?.total_rating_count||0,
            storyline:game?.storyline||"",
            summary:game?.summary||"",
            url:game?.url||"",
            screenshots:_screenShoots||[],
            videos:_videos||[],
            images:_images||[],
            realeaseTime:game?.first_release_date||0
        }
        gameListWithData.push(response);
    }

    return gameListWithData;

}

const _getGame=async(gameID:any)=>{


    const gameRawResponse = await fetch('https://api.igdb.com/v4/games',
    {
        method:'POST',
        headers:{
            Accept: 'application/json',
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
        },
        body:`fields *; where id = ${gameID};`
    });


    const gameList = await gameRawResponse?.json();

    const game = gameList[0];

    const {_screenShoots,_videos,_images} = await _getGameExtraInfo(game.id);


    const response ={
        id:game?.id,
        name:game?.name,
        ratingA:game?.aggregated_rating,
        ratingAcount:game?.aggregated_rating_count,
        ratingB:game?.total_rating,
        ratingBcount:game?.total_rating_count,
        storyline:game?.storyline,
        summary:game?.summary,
        url:game?.url,
        screenshots:_screenShoots,
        videos:_videos,
        images:_images,
        realeaseTime:game?.first_release_date
    }

    return response;

}

export const gameHandler =(gameID?:any)=>{


    return new Promise(async(res,rej)=>{
        if(gameID){
        
            const _date = new Date;
    
            if(_date<expires_in||accessToken===""){
                await _login();
            }
    
            let gameInfo;
    
            if(typeof gameID ==="number"){
                gameInfo = await _getGame(gameID);
            }else{
                gameInfo = await _getGamesByName(gameID);
            }
    
            res({ok:true,data:gameInfo}) 
        }else{
            const _gamesList:any[]=[];

            const gameList = await GameModel.find({});
            
            gameList?.forEach((x:any) => _gamesList.push({
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

            res({ok:true,data:_gamesList}) 
        }
    })


}


