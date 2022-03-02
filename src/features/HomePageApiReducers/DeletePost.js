import {createSlice} from '@reduxjs/toolkit';
import {deletePost} from '../../api/HomePageAPIs/Posts';


export const postsSlice = createSlice({
    name: 'deletePost',
    initialState : {value: {
        status: null
    }},
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