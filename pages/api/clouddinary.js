// import type { NextApiRequest, NextApiResponse } from 'next'
import Formidable from 'formidable';
import cloudinaryPack from 'cloudinary';

const cloudinary = cloudinaryPack.v2;

// type Data = {
//   name: string
// }

cloudinary.config({
    cloud_name: "mycodelabteam",
    api_key: "313681954979617",
    api_secret: "nV4TPyf7G8rEP-FgE41lF0ixRO0"
});


const deleteFile =(fileName='')=>{

  return new Promise((res,rej)=>{
    cloudinary.uploader.destroy(fileName).then(result=>{
        res(true);
     })
  });

}

const createUpdateFile = (filePath,fileName,upload_preset)=>{
  return new Promise((res,rej)=>{
    cloudinary.uploader.upload(filePath ,{public_id:fileName ,overwrite:true, upload_preset:upload_preset}).then((result)=>{
      // res.status(200).json({ ...result})
      res({...result});
    });
  });
}



export default async function handler(req,res) {
     const form = new Formidable.IncomingForm();

     form.parse(req, async (err, fields, files) => {

      let _result = false;
      const file ={ ...files?.file};
      const {fileName,upload_preset,action} = fields;

      switch (action) {
        case "createUpdate":
          _result = await createUpdateFile(file.path,fileName,upload_preset);
          break;

        case "delete":
          _result = await deleteFile(fileName);
          break;
      
        default:
          break;
      }
      
      res.status(200).json(_result);

    });  
}




// para formularios se requiere esto
export const config = {
    api: {
      bodyParser: false,
    },
  }