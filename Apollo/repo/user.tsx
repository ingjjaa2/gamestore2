import {loginQuery} from '../querry/user';

class UserRepo{
    logIn(username:string,password:string):Promise<string>{
        return new Promise((res,rej)=>{

            const query =  loginQuery(username,password);
            fetch('http://localhost:3000/api/graphql',{
                method:'POST',
                headers:{ 'Content-Type': 'application/json'},
                body:JSON.stringify({query})
            }).then(async(rawResponse)=>{
                const response = await rawResponse.json();
                res(response?.data?.authUser?.token);
            }).catch(error=>{
                rej("");
            })
        })
    }
}

export const UserAdmin = new UserRepo();