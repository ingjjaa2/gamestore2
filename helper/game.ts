const ApiBaseURL = 'http://localhost:3000/api/igdb';

export const getGameDataById =(gameID:number)=>{

    return new Promise<any>((res,rej)=>{
        
        const data ={
            gameID
        }
                
        fetch(ApiBaseURL,{
            method:'POST',
            body:JSON.stringify(data)
        }).then(async(rawResponse)=>{
            const response = await rawResponse.json();
            console.log(response);
            res(true);
        }).catch((error)=>{
            console.log(error);
            rej(false);
        })
    });


}