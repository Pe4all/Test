import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthorsSelectState {
  selectedOption: string;
  selectedOptionId: string;
  optionsVisible: boolean;
}

const initialState: AuthorsSelectState = {
  selectedOption: '',
  selectedOptionId: '',
  optionsVisible: false,
};

export const authorsSelectSlice = createSlice({
  name: 'authorsSelect',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<string>) => ({
      ...state,
      selectedOption: action.payload,
    }),
    setSelectedOptionId: (state, action: PayloadAction<string>) => ({
      ...state,
      selectedOptionId: action.payload,
    }),
    setOptionsVisible: (state, action: PayloadAction<boolean>) => ({
      ...state,
      optionsVisible: action.payload,
    }),
  },
});

export const { setSelectedOption, setOptionsVisible, setSelectedOptionId } =
  authorsSelectSlice.actions;

export default authorsSelectSlice.reducer;
