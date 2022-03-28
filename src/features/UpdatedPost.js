import {createSlice} from '@reduxjs/toolkit';
import postsApi from '../services/HomePageApi';

export const postsSlice = createSlice({
    name: 'UpdatedPost',
    initialState : {value: {
        UpdatedPost: {},
        status: null,
    }},
    extraReducers:  builder => {
        builder.addCase(postsApi.endpoints.updatePost.matchFulfilled, (state, action) => {
        //   state.value.UpdatedPost = ;
        console.log(action.payload)
        })}
      
})


export default postsSlice.reducer;