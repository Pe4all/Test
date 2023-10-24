import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setActivePage } from '../../store/slices/paginationCount.slice';
import PaginationUI from './pui';

function PaginationContainer() {
  const buttonsCount = useSelector(
    (state: RootState) => state.pagination.totalCount,
  );

  const currentPage = useSelector(
    (state: RootState) => state.pagination.activePage,
  );

  const dispatch = useDispatch();

  const handlePageBack = () => {
    if (currentPage > 1) {
      dispatch(setActivePage(currentPage - 1));
    }
  };

  const handleFirstPage = () => {
    if (currentPage > 1) {
      dispatch(setActivePage(1));
    }
  };

  const handleLastPage = () => {
    if (buttonsCount !== null) {
      if (currentPage < buttonsCount) {
        dispatch(setActivePage(buttonsCount));
      }
    }
  };

  const handlePageNext = () => {
    if (buttonsCount !== null) {
      if (currentPage < buttonsCount) {
        dispatch(setActivePage(currentPage + 1));
      }
    }
  };

  const handlePageButtonClick = (i: number) => {
    dispatch(setActivePage(i));
  };

  return (
    <PaginationUI
      buttonsCount={buttonsCount}
      currentPage={currentPage}
      handlePageBack={handlePageBack}
      handleFirstPage={handleFirstPage}
      handleLastPage={handleLastPage}
      handlePageNext={handlePageNext}
      handlePageButtonClick={handlePageButtonClick}
    />
  );
}

export default PaginationContainer;
