import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';


const url = 'https://blog-posts-1699.herokuapp.com/api/v1/posts';


export const getPosts = createAsyncThunk(
    'Posts/getPosts',
    async ({page, sort, UserIDParam}) => {
        return await axios.get(url + `?page=${page}&sort=${sort}${UserIDParam}`);
        
    }
)

export const deletePost = createAsyncThunk(
    'deletePost/deletePost',
    async ({id, token}) => {
        return await  axios.delete(url+`/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })   
        
    }
)

export const updatePost = createAsyncThunk(
    'UpdatedPost/updatePost',
    async ({PostID, update, token}, dispatch) => {
        return await axios.patch(url+`/${PostID}`, {title: update.newtitle, postText: update.newpostText }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })        
    }
)