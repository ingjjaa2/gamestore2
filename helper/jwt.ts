import jwt from 'jsonwebtoken';


export const generarJWT=(payload:string)=>{

    return new Promise((res,rej)=>{
        // const {} ={uid};
        const JWT_KEY = process.env.JWT_KEY||"";

        jwt.sign({payload},JWT_KEY,{
            expiresIn :'12h'
        },(err:any,token:any)=>{
            if(err){
                console.log(err);
                rej("No se genero JWT");
            }else{
                res(token);
            }
        })

    });
}


export const comprobarJWT=(token='')=>{
    try {
        const JWT_KEY = process.env.JWT_KEY||"";
        const payload = jwt.verify(token,JWT_KEY);
        return {ok:true,payload}
    } catch (error) {
        return {ok:false,payload:null}
    }
}