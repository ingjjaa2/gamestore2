import {gql} from '@apollo/client'
import {game} from '../repo/game'

export const gettAllGamesPlain ={query:`query{
    getAllGame{
          _id,
      name,
      detail,
      cardUrl,
      banneUrl,
      igdbID,
      isOnCd,
      isOnDigital,
      gameIsNew,
      ano,
      platform,
      typeGame,
      precioVenta,
      ratingA,
      ratingAcount,
      ratingB,
      ratingBcount,
      start,
      url,
      screenshots,
      videos,
      images  
    }
  }`}

export const getOneGameById=(gameID:string)=>{
  
  const _query = `
  query{
    getGameById(input:{
      _id:"${gameID}"
    }){
      _id,
      name,
      detail,
      cardUrl,
      banneUrl,
      igdbID,
      isOnCd,
      isOnDigital,
      gameIsNew,
      ano,
      platform,
      typeGame,
      precioVenta,
      ratingA,
      ratingAcount,
      ratingB,
      ratingBcount,
      start,
      url,
      screenshots,
      videos,
      images   
    }
  }
  `
  return _query
}

export const createGame=(game:game)=>{

  let _screenshots:string[] = [];
  game?.screenshots?.forEach(x=>{
    _screenshots.push(`"${x}"`)
  });

  let _videos:string[] = [];
  game?.videos?.forEach(x=>{
    _videos.push(`"${x}"`)
  });

  let _images:string[] = [];
  game?.images?.forEach(x=>{
    _images.push(`"${x}"`)
  });

  const mutation = `mutation{
    createGame(input:{
          _id:"${game?.id}",
          name:"${game.name}",
          detail:"${game.detail.replace(/["']/g, "").replace(/(\r\n|\n|\r)/gm, "")}",
          cardUrl:"${game.cardUrl}",
          banneUrl:"${game.banneUrl}",
          igdbID:${game.igdbID},
          isOnCd:${game.isOnCd},
          isOnDigital:${game.isOnDigital},
          gameIsNew:${game.gameIsNew},
          ano:${game.ano},
          platform:"${game.platform}",
          typeGame:"${game.typeGame}",
          precioVenta:${game.precioVenta},
          ratingA:${game.ratingA},
          ratingAcount:${game.ratingAcount},
          ratingB:${game.ratingB},
          ratingBcount:${game.ratingBcount},
          start:${game.start},
          url:"${game.url}",
          screenshots:[${_screenshots}],
          videos:[${_videos}],
          images:[${_images}]
    }){
      _id
    }
  }`;

  return mutation;

}

export const deleteGame=(idString:string)=>{
  const mutation=`mutation{
    deleteGame(input:{_id:"${idString}"})
  }`;

  return mutation;
}