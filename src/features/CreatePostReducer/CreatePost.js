import {createSlice} from '@reduxjs/toolkit';
import {createPost} from '../../api/CreatePostAPI/CreatePost';


export const Slicer = createSlice({
    name: 'CreatePost',
    initialState : {value: {
        status: null,
    }},
    extraReducers: {
       [createPost.pending]: (state) => {
           state.value.status = 'loading'
           console.log('creating')
       },
       [createPost.fulfilled]: (state) => {
           state.value.status = 'success'
           console.log('succ')
       }   
    }
})


export default Slicer.reducer;