import { gql } from "apollo-server-micro";

import {Usuario,UsuarioInput,UsuarioAuthInput} from './usuario';
import {InputGetById,InputGetByUserId} from './generals';
import {File,FileInput} from './file'


const Query = `
  type Query {
    hello: String,
    authUser(input:UsuarioAuthInput):Usuario,
    validateToken:Usuario,
    getUser(input:InputGetByUserId):Usuario,
    getListUsers:[Usuario],
    getFileById(input:InputGetById):File,
    getFileListByUser(input:InputGetByUserId):[File],    
  }
`;

const Mutation=`
type Mutation {
  createUser(input:UsuarioInput):Usuario,
  deleteuser(input:InputGetById):Boolean,  
  createFile(input:FileInput):File,
  deleteFile(input:InputGetById):Boolean,
}`;

const Subscription=`
type Subscription{
  getMessages(input:InputGetByUserId):[Message],
}`;

const typeDefs = [Query,Mutation,Subscription,Usuario,UsuarioInput,UsuarioAuthInput,InputGetById,
                 InputGetByUserId,File,FileInput];

export default typeDefs;