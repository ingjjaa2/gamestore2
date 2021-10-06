

export class Repository{
    repoName: any;

    constructor(filename:string){
       try {
            this.repoName=filename;
       } catch (error) {
           console.log("No hay lista de juegos");
       } 
    }

    getAll(token:string,queryBody:any):Promise<any[]>{
        return new Promise((res,rej)=>{
            if(this?.repoName==="gamesList"){
                fetch('http://localhost:3000/api/graphql',{
                    method:'POST',
                    headers:{ 'Content-Type': 'application/json',
                    "xtoken":token},
                    body:JSON.stringify(queryBody)
                }).then(async(rawResponse)=>{
                    const response = await rawResponse.json();
                    res(response.data.getAllGame);
                }).catch(error=>{
                    console.log("en el repo principal con error");
                    rej([]);
                })
    
            }
        })


    }

    getOne(token:string,query:any):Promise<any>{
        return new Promise((res,rej)=>{
            if(this?.repoName==="gamesList"){
                fetch('http://localhost:3000/api/graphql',{
                    method:'POST',
                    headers:{ 'Content-Type': 'application/json',
                    "xtoken":token},
                    body:JSON.stringify({query})
                }).then(async(rawResponse)=>{
                    const response = await rawResponse.json();
                    res(response.data);
                }).catch(error=>{
                    console.log({queryBody:JSON.stringify(query),error});
                    rej([]);
                })
    
            }
        })
    }
}
