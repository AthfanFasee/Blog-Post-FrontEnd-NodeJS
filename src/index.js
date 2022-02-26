import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import updateReducer from './features/UpdateInputElements';
import updatePostID from './features/PostID';
import updateUserIDParam from './features/UserIDParam';
import PostsReducer from './features/HomePageAPIs/PostsList';
import UpdatePostReducer from './features/HomePageAPIs/UpdatePost';
import deletePostReducer from './features/HomePageAPIs/UpdatePost';


const store = configureStore({
  reducer: {
    update: updateReducer,
    PostID: updatePostID,
    UserIDParam: updateUserIDParam,
    Posts: PostsReducer,
    updatePost : UpdatePostReducer,
    deletePost : deletePostReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
