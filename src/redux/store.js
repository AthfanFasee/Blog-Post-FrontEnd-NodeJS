import {configureStore} from '@reduxjs/toolkit';
import updateReducer from '../features/UpdateInputElements';
import updatePostID from '../features/PostID';
import updateUserIDParam from '../features/UserIDParam';
import PostsReducer from '../features/HomePageApiReducers/PostsList';
import UpdatePostReducer from '../features/HomePageApiReducers/UpdatePost';
import deletePostReducer from '../features/HomePageApiReducers/UpdatePost';
import createPostReducer from '../features/CreatePostReducer/CreatePost';



export const store = configureStore({
    reducer: {
      update: updateReducer,
      PostID: updatePostID,
      UserIDParam: updateUserIDParam,
      Posts: PostsReducer,
      updatePost : UpdatePostReducer,
      deletePost : deletePostReducer,
      createPost: createPostReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });


