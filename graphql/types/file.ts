export const File=`
type File{
    _id:ID,
    description:String,
    version:String,
    url:String,
    userOwner:Usuario
} 
`

export const FileInput=`
input FileInput{
    _id:String,
    description:String,
    version:String,
    url:String,
    userOwner:String
}
`