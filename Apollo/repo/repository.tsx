import gamesList from '../../games.json';

export class Repository{
    repoName: any;

    constructor(filename:string){
       try {
            this.repoName=filename;
       } catch (error) {
           console.log("No hay lista de juegos");
       } 
    }

    async getAll(){
        if(this?.repoName==="gamesList"){
            return gamesList;
        }
    }

    async getOne(id:string){
        const records = await this.getAll();
        return records?.find(record => record.id === id);
    }


}