import Usuario from '../../db/models/usuarios';
import bcrypt from 'bcrypt';
import {generarJWT} from '../helpers/jwt'

export const createUser={
    Mutation:{
        async createUser(parent: any, args: any, context: any){
            try {
                const {input} = args;
                const existeEmail = await Usuario.findOne({ email:input.email });
                console.log("esta aqui");
                if(existeEmail){
                    const _updateInputs ={...input};
                    delete _updateInputs._id;
                    if(_updateInputs.password===''){
                        delete _updateInputs.password;
                    }else{
                        const salt = bcrypt.genSaltSync();
                        _updateInputs['password'] = bcrypt.hashSync(_updateInputs.password,salt);
                    }
                    const user = await Usuario.findByIdAndUpdate(input._id,_updateInputs,{new:true});
                    return user;
                }else{
                    const newUser = new Usuario(input);
                    const salt = bcrypt.genSaltSync();
                    newUser['password'] = bcrypt.hashSync(input.password,salt);
                    await newUser.save();
                    return newUser;
                }
            } catch (error) {
                console.log("=========esta en error de createUser================");
                console.log(error);
                return null;
            }

        } 
    }
}

export const authUser={
    Query:{
        async authUser(parent: any, args: any, context: any){
            try {
                const {email,password} = args.input;
                const usuarioDB = await Usuario.findOne({ email });
                if(!usuarioDB){
                    return null;
                }else{
                    const validPassword = bcrypt.compareSync( password, usuarioDB.password );
                    if ( validPassword ) {
                        const token = await generarJWT( usuarioDB._id );
                        usuarioDB.token = token;
                        return usuarioDB;
                    }
                }
            
            } catch (error) {
                console.log("=========esta en error de authUser================");
                console.log(error);
                return null;
            }
        }
    }
}

export const validateToken={
    Query:{
        async validateToken(parent: any, args: any, context: any){
            try {
                const {authState} = context;
                if(authState.ok){
                    const {payload} = authState.payload;
                    const usuarioDB = await Usuario.findById(payload);
                    const token = await generarJWT( usuarioDB._id );
                    usuarioDB.token = token;
                    return usuarioDB;
                }else{
                    console.log("Token no valido")
                    return null;
                }
                // const usuarioDB = await Usuario.findOne({ email });

            
            } catch (error) {
                console.log("=========esta en error de authUser================");
                console.log(error);
                return null;
            }
        }
    }
}

export const getUser={
    Query:{
        async getUser(parent: any, args: any, context: any){
            const {authState} = context;
            if(authState.ok){
                const {_id} = args.input;
                const selected = await Usuario.findById(_id);
                return selected
           }else{
               console.log("usuario no valido");
               return null;
           }
        }
    }
}

export const getListUsers={
    Query:{
        async getListUsers(parent: any, args: any, context: any){
            const {authState} = context;
            if(authState.ok){
                const list = await Usuario.find();
                return list
           }else{
               console.log("usuario no valido");
               return null;
           }
        }
    }
}

export const deleteuser={
    Mutation:{
        async deleteuser(parent:any,args:any,context:any){
            const {authState} = context;
            if(authState.ok){
                const {_id} =  args.input;
                await Usuario.findByIdAndDelete(_id);
                return true;
           }else{
               console.log("usuario no valido");
               return null;
           }
        }
    }
}