import {Schema, model,models} from 'mongoose';

const UsuarioSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    contactInfo:{
        type:String,
        require:true
    },
    online:{
        type:Boolean,
        default:false
    },
    state:{
        type:String,
        require:true
    },
    userType:{
        type:String,
        default:'user'
    },
    userAvartarUrl:{
        type:String,
        require:false
    }
});

export default models.Usuario || model('Usuario',UsuarioSchema);