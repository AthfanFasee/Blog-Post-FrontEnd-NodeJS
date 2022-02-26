import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const url = 'https://blog-posts-1699.herokuapp.com/api/v1/posts';


export const updatePost = createAsyncThunk(
    'UpdatedPost/updatePost',
    async ({PostID, update, token}) => {
        return await axios.patch(url+`/${PostID}`, {title: update.newtitle, postText: update.newpostText }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        
    }
)

export const postsSlice = createSlice({
    name: 'UpdatedPost',
    //to save the curren post's ID (Used while updating the post)
    initialState : {value: {
        UpdatedPost: {},
        status: null,
    }},
    extraReducers: {
        [updatePost.pending]: (state) => {
            state.value.status = 'loading'
        },
        [updatePost.fulfilled]: (state, {payload}) => {
        state.value.UpdatedPost = payload.data.post
       }  
    }
})


export default postsSlice.reducer;