import type { NextApiRequest, NextApiResponse } from 'next'

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

const _getGame=async(gameID:number)=>{

    const _screenShoots:any[]=[];
    const _videos:any[]=[];
    const _images:any[]=[];

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

    const gameList = await gameRawResponse.json();

    const game = gameList[0];

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
        images:_images
    }

    return response;

}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {gameID} = JSON.parse(req.body);

    if(gameID){
        
        const _date = new Date;

        if(_date<expires_in||accessToken===""){
            await _login();
        }

        // const rawResponse = await fetch('https://api.igdb.com/v4/games',
        // {
        //     method:'POST',
        //     headers:{
        //         Accept: 'application/json',
        //         "Client-ID": clientId,
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        //     body:`fields *; where id = ${gameID};`
        // });

        // const imagesRawResponse = await fetch('https://api.igdb.com/v4/artworks',
        // {
        //     method:'POST',
        //     headers:{
        //         Accept: 'application/json',
        //         "Client-ID": clientId,
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        //     body:`fields *; where game = ${gameID};`
        // });


        // const response = await rawResponse.json();
        // const responseImages = await imagesRawResponse.json();

        const gameInfo = await _getGame(gameID);

        res.status(200).json({ok:true,data:gameInfo}) 
    }else{
        res.status(400).json({ok:false}) 
    }

}