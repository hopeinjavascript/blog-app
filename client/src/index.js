import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/userContext';
import ArticleContextProvider from './context/articleContext';
import CommentContextProvider from './context/commentContext';

global.BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ArticleContextProvider>
        <CommentContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CommentContextProvider>
      </ArticleContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
