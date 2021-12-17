const apiRul = `http://localhost:3000/api/admin`;
// const apiRul = `https://gamestore2-ip80bdqws-jonavi1305-gmailcom.vercel.app/api/admin`;

interface bodyData{
    action:'login'|'addGame'|'deleteGame'|'listOfgames'|'getGameById',
    data?:any,
    token?:string
}


export const fetchSinToken=async({action,data}:bodyData)=>{

  return new Promise((resolve,reject)=>{
    fetch(apiRul, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({action,data}),
      }).then(async(res)=>{
          const json = await res.json();
          resolve(json);
      }).catch((error)=>{
        reject(false);
      })
})
  
}

export const fetchConToken=async({action,data,token=''}:bodyData)=>{

    
    const url = `${apiRul}`;

   
      const resp = await fetch(url,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'x-token':token
          },
          body:JSON.stringify({action,data})
      });
      return await resp.json();
  
  
}