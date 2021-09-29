import {Schema, model,models} from 'mongoose';

const FileSchema = new Schema({
    description:{
        type:String,
        require:true
    },
    version:{
        type:String,
        require:false 
    },
    url:{
        type:String,
        require:false 
    },
    userOwner:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    }

},{
    timestamps:true
});

export default models.File || model('File',FileSchema);