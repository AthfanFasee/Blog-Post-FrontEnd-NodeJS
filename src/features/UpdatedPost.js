import {createSlice} from '@reduxjs/toolkit';

export const postsSlice = createSlice({
    name: 'UpdatedPost',
    initialState : {value: {
        UpdatedPost: {},
    }},
    reducers: {
      updatePost: (state,action) => {
          state.value = action.payload;
          console.log('updated', action.payload)
      }
  }
      
})

export const {updatePost} = postsSlice.actions;

export default postsSlice.reducer;