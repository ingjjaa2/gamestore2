import {gql} from '@apollo/client'


export const getAllGame=gql`
query{
  getAllGame{
        _id,
    name,
    detail,
    cardUrl,
    banneUrl,
    igdbID,
    isOnCd,
    isOnDigital,
    isNew,
    ano,
    platform,
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
      isNew,
      ano,
      platform,
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
      isNew,
      ano,
      platform,
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