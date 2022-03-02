import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';


const url = 'https://blog-posts-1699.herokuapp.com/api/v1/posts';


export const createPost = createAsyncThunk(
    'CreatePost/createPost',
    async ({title, postText, token}) => {
        return await axios.post(url, {title, postText}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })       
    }
)
