export const InputGame=`
input InputGame{
    _id:String,
    name:String,
    detail:String,
    cardUrl:String,
    banneUrl:String,
    igdbID:Int,
    isOnCd:Boolean,
    isOnDigital:Boolean,
    isNew:Boolean,
    ano:Int,
    platform:String,
    precioVenta:Int,
    ratingA:Float,
    ratingAcount:Int,
    ratingB:Float,
    ratingBcount:Int,
    start:Float,
    url:String,
    screenshots:[String],
    videos:[String],
    images:[String]
}`;

export const Game=`
type Game{
    _id:String,
    name:String,
    detail:String,
    cardUrl:String,
    banneUrl:String,
    igdbID:Int,
    isOnCd:Boolean,
    isOnDigital:Boolean,
    isNew:Boolean,
    ano:Int,
    platform:String,
    precioVenta:Int,
    ratingA:Float,
    ratingAcount:Int,
    ratingB:Float,
    ratingBcount:Int,
    start:Float,
    url:String,
    screenshots:[String],
    videos:[String],
    images:[String]
}`;