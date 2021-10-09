import Game from '../../db/models/game';


export const createGame={
    Mutation:{
        async createGame(parent: any, args: any, context: any){
            try {
                const {authState} = context;
                if(authState.ok){
                    const {input} =  args;
                    const _element = {...input};
                    let newGame = null;
                    if(_element.hasOwnProperty('_id')&&_element?._id!=="undefined"){
                        const _updateInputs ={...input};
                        delete _updateInputs._id;
                        console.log({_updateInputs})
                        newGame = await Game.findByIdAndUpdate(input._id,_updateInputs,{new:true});
                    }else{
                        const _createInputs ={...input};
                        delete _createInputs._id;
                        newGame = new Game(_createInputs);
                        await newGame.save();
                    }
                    return newGame;
                }else{
                    console.log("usuario no valido");
                    return null;
                }
                
            } catch (error) {
                console.log("=========esta en error de createGame================");
                console.log(error);
                return null; 
            }
        }
    }
}

export const deleteGame={
    Mutation:{
        async deleteGame(parent:any,args:any,context:any){
            const {authState} = context;
            if(authState.ok){
                const {_id} =  args.input;
                await Game.findByIdAndDelete(_id);
                return true;
           }else{
               console.log("usuario no valido");
               return null;
           }
        }
    }
}

export const getGameById ={
    Query:{
        async getGameById(parent: any, args: any, context: any){
            const {authState} = context;
                const {_id} = args.input;
                const gameList = await Game.find({_id});
                return gameList[0]
        }
    }
}

export const getAllGame={
    Query:{
        async getAllGame(parent: any, args: any, context: any){
            const {authState} = context;
            const gameList = await Game.find({});
            return gameList
        }
    }
}