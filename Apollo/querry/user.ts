export const loginQuery=(username:string,password:string)=>{

    const _query= `query{
        authUser(input:{
          email:"${username}",
          password:"${password}"
        }){
          token
        }
      }`

    return _query;
}