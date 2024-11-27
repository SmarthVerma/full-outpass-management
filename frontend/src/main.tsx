import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BACKEND_URI } from "./assets/constant/index";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {store} from './redux/store.js'
import { Provider } from 'react-redux'

const client = new ApolloClient({
  uri: BACKEND_URI,
  cache: new InMemoryCache(),
  credentials: 'include'
});

console.log("this is ", BACKEND_URI)

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
