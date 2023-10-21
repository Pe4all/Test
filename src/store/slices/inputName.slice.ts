import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputNameState {
  inputName: string;
}

const initialState: InputNameState = {
  inputName: '',
};

export const inputNameSlice = createSlice({
  name: 'inputName',
  initialState,
  reducers: {
    setInputName: (state, action: PayloadAction<string>) => ({
      ...state,
      inputName: action.payload,
    }),
  },
});

export const { setInputName } = inputNameSlice.actions;

export default inputNameSlice.reducer;
