import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://blog-posts-1699.herokuapp.com/api/v1/posts';


export const getPosts = createAsyncThunk(
    'Posts/getPosts',
    async ({page, sort, UserIDParam}) => {
        return await axios.get(url + `?page=${page}&sort=${sort}${UserIDParam}`);
        
    }
)

export const postsSlice = createSlice({
    name: 'Posts',
    //to save the curren post's ID (Used while updating the post)
    initialState : {value: {
        posts: [],
        noOfPages: 0,
        status: null,
    }},
    extraReducers: {
       [getPosts.pending]: (state) => {
           state.value.status = 'loading'
       },
       [getPosts.fulfilled]: (state, {payload}) => {
           state.value.posts = payload.data.posts
           state.value.noOfPages = payload.data.noOfPages
           state.value.status = 'success'
       },
       [getPosts.rejected]: (state) => {
            state.value.status = 'failed'     
       }
    }
})


export default postsSlice.reducer;