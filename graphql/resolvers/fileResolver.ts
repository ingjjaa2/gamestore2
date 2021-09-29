import File from '../../db/models/file';

export const createFile={
    Mutation:{
        async createFile(parent:any,args:any,context:any){
            const {authState} = context;
            if(authState.ok){
                const {input} =  args;
                const _element = {...input};
                let newFile = null;
                if(_element.hasOwnProperty('_id')){
                    const _updateInputs ={...input};
                    delete _updateInputs._id;
                    newFile = await File.findByIdAndUpdate(input._id,_updateInputs,{new:true});
                }else{
                    const existUrl = await File.find({url:input.url})
                    if(existUrl.length>0){
                        newFile = existUrl[0]
                    }else{
                        newFile = new File(input);
                        await newFile.save();
                    }
                }
                return newFile;
            }else{
                console.log("usuario no valido");
                return null;
            }
        }
    }
}

export const getFileListByUser={
    Query:{
        async getFileListByUser(parent: any, args: any, context: any){
            const {authState} = context;
            if(authState.ok){
                const {_iduser} = args.input;
                const fileList = await File.find({userOwner:_iduser})
                                    .populate('userOwner')
                return fileList
           }else{
               console.log("usuario no valido");
               return null;
           }
        }
    }
}

export const getFileById={
    Query:{
        async getFileById(parent: any, args: any, context: any){
            const {authState} = context;
            if(authState.ok){
                const {_id} = args.input;
                const file = await File.find({_id})
                                    .populate('userOwner')
                return file
           }else{
               console.log("usuario no valido");
               return null;
           }
        }
    }
}

export const deleteFile={
    Mutation:{
        async deleteFile(parent:any,args:any,context:any){
            const {authState} = context;
            if(authState.ok){
                const {_id} =  args.input;
                await File.findByIdAndDelete(_id);
                return true;
           }else{
               console.log("usuario no valido");
               return null;
           }
        }
    }
}