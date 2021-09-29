export const Usuario =`
type Usuario{
    _id:ID,
    name:String,
    email:String,
    password:String,
    contactInfo:String,
    online:Boolean,
    state:String,
    token:String,
    userType:String,
    userAvartarUrl:String
  },
`;

export const UsuarioInput=`
input UsuarioInput{
  _id:String,
  name:String!,
  email:String!,
  password:String!,
  contactInfo:String,
  userType:String,
  userAvartarUrl:String
  }
`;

export const UsuarioAuthInput=`
input UsuarioAuthInput{
  email:String!,
  password:String!
}
`;
