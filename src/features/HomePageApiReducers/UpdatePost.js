import {createSlice} from '@reduxjs/toolkit';
import {updatePost} from '../../api/HomePageAPIs/Posts';


export const postsSlice = createSlice({
    name: 'UpdatedPost',
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