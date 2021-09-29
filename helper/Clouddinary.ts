// const ApiBaseURL = 'https://api.cloudinary.com/v1_1/dtxyfbikc/image/upload';
const ApiBaseURL = 'http://localhost:3000/api/clouddinary';


export const uploadFile = (file:File,fileName:string='default')=>{

    return new Promise<any>((res,rej)=>{

        const data = new FormData();
        data.append('file',file);
        data.append('upload_preset','ml_default');
        data.append('fileName',fileName);
        data.append('action','createUpdate');

        fetch(ApiBaseURL,{
            method:'POST',
            body:data
        }).then(async(response)=>{
            const json = await response.json();
            // console.log(json);
            res(json)
        }).catch((error)=>{
            console.log({error});
            rej(false);
        })
    });


}

export const deleteFile = (fileName:string='default')=>{

    return new Promise<any>((res,rej)=>{

        const data = new FormData();
        data.append('upload_preset','ml_default');
        data.append('fileName',fileName);
        data.append('action','delete');


        fetch(ApiBaseURL,{
            method:'POST',
            body:data
        }).then(async(response)=>{
            const json = await response.json();
            // console.log(json);
            res(json)
        }).catch((error)=>{
            console.log({error});
            rej(false);
        })
    });


}