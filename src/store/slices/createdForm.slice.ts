import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatedFormState {
  formVisible: boolean;
  after: string | null;
  before: string | null;
}

const initialState: CreatedFormState = {
  formVisible: false,
  after: null,
  before: null,
};

export const createdFormSlice = createSlice({
  name: 'created',
  initialState,
  reducers: {
    toggleForm: (state) => ({
      ...state,
      formVisible: !state.formVisible,
    }),
    setAfter: (state, action: PayloadAction<string | null>) => ({
      ...state,
      after: action.payload,
    }),
    setBefore: (state, action: PayloadAction<string | null>) => ({
      ...state,
      before: action.payload,
    }),
  },
});

export const { toggleForm, setAfter, setBefore } = createdFormSlice.actions;

export default createdFormSlice.reducer;
