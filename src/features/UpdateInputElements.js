import {createSlice} from '@reduxjs/toolkit';

const initialStateValues = { newtitle: "", newpostText: ""}

export const updateSlice = createSlice({
    name: 'update',
    //to save data of update post input elements
    initialState : { value: initialStateValues},  
    reducers: {
        updateInputValue: (state,action) => {
            state.value = action.payload;
        }
    }
})

export const {updateInputValue} = updateSlice.actions;
export default updateSlice.reducer;