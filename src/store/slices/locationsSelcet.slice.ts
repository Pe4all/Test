import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationsSelectState {
  selectedOption: string;
  selectedOptionId: string;
  optionsVisible: boolean;
}

const initialState: LocationsSelectState = {
  selectedOption: '',
  selectedOptionId: '',
  optionsVisible: false,
};

export const locationsSelectSlice = createSlice({
  name: 'locationsSelect',
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
  locationsSelectSlice.actions;

export default locationsSelectSlice.reducer;
