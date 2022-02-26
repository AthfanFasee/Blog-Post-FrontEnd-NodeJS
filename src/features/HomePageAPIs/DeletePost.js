import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const url = 'https://blog-posts-1699.herokuapp.com/api/v1/posts';


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

export const postsSlice = createSlice({
    name: 'deletePost',
    //to save the curren post's ID (Used while updating the post)
    initialState : {value: ""},
    extraReducers: {
        [deletePost.pending]: (state) => {
            state.value.status = 'loading'
        },
        [deletePost.fulfilled]: (state) => {
            state.value.status = 'Success'
       }  
    }
})


export default postsSlice.reducer;