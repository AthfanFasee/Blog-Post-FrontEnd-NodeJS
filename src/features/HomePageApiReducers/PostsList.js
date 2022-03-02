import {createSlice} from '@reduxjs/toolkit';
import {getPosts} from '../../api/HomePageAPIs/Posts';


export const postsSlice = createSlice({
    name: 'Posts',
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