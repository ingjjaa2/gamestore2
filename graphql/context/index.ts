import {comprobarJWT} from '../helpers/jwt';


const context=({req:{headers}}:{req:any})=>{

    const authState = comprobarJWT(headers['xtoken']);

    return{
        authState,
    }
}


export default context;