import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from "./Context/ContextProvider";
import {ApolloClient,InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://book-library-backend-saurav.vercel.app/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
  <ApolloProvider client={client}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ApolloProvider>
</BrowserRouter>

);


reportWebVitals();
