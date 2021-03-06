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