import { gql } from "apollo-server-micro";

import {Usuario,UsuarioInput,UsuarioAuthInput} from './usuario';
import {InputGetById,InputGetByUserId} from './generals';
import {File,FileInput} from './file'
import {Game,InputGame} from './game'


const Query = `
  type Query {
    hello: String,
    authUser(input:UsuarioAuthInput):Usuario,
    validateToken:Usuario,
    getUser(input:InputGetByUserId):Usuario,
    getListUsers:[Usuario],
    getFileById(input:InputGetById):File,
    getFileListByUser(input:InputGetByUserId):[File],    
    getGameById(input:InputGetById):Game,
    getAllGame:[Game]    
  }
`;

const Mutation=`
type Mutation {
  createUser(input:UsuarioInput):Usuario,
  deleteuser(input:InputGetById):Boolean,  
  createFile(input:FileInput):File,
  deleteFile(input:InputGetById):Boolean,
  createGame(input:InputGame):Game,
  deleteGame(input:InputGetById):Boolean,
}`;


const typeDefs = [Query,Mutation,Usuario,UsuarioInput,UsuarioAuthInput,InputGetById,
                 InputGetByUserId,File,FileInput,Game,InputGame];

export default typeDefs;