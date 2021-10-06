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
                    if(_element.hasOwnProperty('_id')){
                        const _updateInputs ={...input};
                        delete _updateInputs._id;
                        newGame = await Game.findByIdAndUpdate(input._id,_updateInputs,{new:true});
                    }else{
                        newGame = new Game(input);
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
            // if(authState.ok){
                const {_id} = args.input;
                const gameList = await Game.find({_id});
                return gameList[0]
        //    }else{
        //        console.log("usuario no valido");
        //        return null;
        //    }
        }
    }
}

export const getAllGame={
    Query:{
        async getAllGame(parent: any, args: any, context: any){
            const {authState} = context;
            // if(authState.ok){
                const gameList = await Game.find({});
                return gameList
        //    }else{
        //        console.log("usuario no valido");
        //        return null;
        //    }
        }
    }
}