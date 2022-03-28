import {configureStore} from '@reduxjs/toolkit';
import updateReducer from '../features/UpdateInputElements';
import updatePostID from '../features/PostID';
import updateUserIDParam from '../features/UserIDParam';
import UpdatePostReducer from '../features/UpdatedPost';
import postsApi from '../services/HomePageApi';
import authApi from '../services/LoginPageApi';
import likeAndCommentApi from '../services/Like&CommentApi';

export const store = configureStore({
    reducer: {
      [postsApi.reducerPath] : postsApi.reducer,
      [authApi.reducerPath] : authApi.reducer,
      [likeAndCommentApi.reducerPath] : likeAndCommentApi.reducer,
      update: updateReducer,
      PostID: updatePostID,
      UserIDParam: updateUserIDParam,   
      updatePost : UpdatePostReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, authApi.middleware, likeAndCommentApi.middleware)
  });


