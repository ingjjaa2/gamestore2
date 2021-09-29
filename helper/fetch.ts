const apiRul = 'http://localhost:3000/api/graphql';



export const fetcher = (query:string)=>{

    return new Promise((resolve,reject)=>{
        fetch(apiRul, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ query }),
          }).then(async(res)=>{
              const json = await res.json();
              resolve(json.data);
          }).catch((error)=>{
            reject(false);
          })
    })

}