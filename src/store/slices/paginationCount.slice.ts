import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  totalCount: number | null;
  paintingsPerPage: number;
  activePage: number;
}

const initialState: PaginationState = {
  totalCount: null,
  paintingsPerPage: 12,
  activePage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setTotalCount: (state, action: PayloadAction<number | null>) => ({
      ...state,
      totalCount: action.payload,
    }),
    setActivePage: (state, action: PayloadAction<number>) => ({
      ...state,
      activePage: action.payload,
    }),
  },
});

export const { setTotalCount, setActivePage } = paginationSlice.actions;

export default paginationSlice.reducer;
