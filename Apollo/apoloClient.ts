import {ApolloClient,InMemoryCache,createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const apiUrl = 'http://localhost:3000/api/graphql';

const httpLink = createHttpLink({
    uri: apiUrl,
  });


  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const localUserData = localStorage.getItem('userTaskManager') ;   
    const {token} = (localUserData)?JSON.parse(localUserData):{token:""};

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        xtoken:token
        // authorization: token ? `x-token ${token}` : "",
      }
    }
  });



export const apolloClient = new ApolloClient({
    // uri:apiUrl,
    link:authLink.concat(httpLink),
    cache:new InMemoryCache()});