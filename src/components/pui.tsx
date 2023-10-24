import React from 'react';
import style from './pagination.module.scss';
import { ReactComponent as Arrow } from '../../images/arrow.svg';
import { ReactComponent as DoubleArrow } from '../../images/doubleArrow.svg';

interface PaginationUIProps {
  buttonsCount: number | null;
  currentPage: number;
  handlePageBack: () => void;
  handleFirstPage: () => void;
  handleLastPage: () => void;
  handlePageNext: () => void;
  handlePageButtonClick: (i: number) => void;
}

function PaginationUI({
  buttonsCount,
  currentPage,
  handlePageBack,
  handleFirstPage,
  handleLastPage,
  handlePageNext,
  handlePageButtonClick,
}: PaginationUIProps) {
  const renderPageButtons = () => {
    const buttons = [];
    if (buttonsCount !== null) {
      let startPage = currentPage - 1;
      let endPage = currentPage + 1;

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(3, buttonsCount);
      } else if (endPage > buttonsCount) {
        endPage = buttonsCount;
        startPage = Math.max(1, endPage - 2);
      }

      for (let i = startPage; i <= endPage; i += 1) {
        buttons.push(
          <button
            key={i}
            className={`${style.pageButton} ${
              i === currentPage ? style.active : ''
            }`}
            type="button"
            onClick={() => handlePageButtonClick(i)}
          >
            {i}
          </button>,
        );
      }
    }
    return buttons;
  };

  return (
    <div className={style.pagination}>
      <button
        className={`${style.arrowButton} ${
          buttonsCount !== null && currentPage > 1 ? style.enabledButton : ''
        }`}
        type="button"
        onClick={handleFirstPage}
      >
        <DoubleArrow
          className={`${style.colorArrow} ${
            buttonsCount !== null && currentPage > 1 ? style.enabledArrow : ''
          }`}
        />
      </button>

      <button
        className={`${style.arrowButton} ${
          buttonsCount !== null && currentPage > 1 ? style.enabledButton : ''
        }`}
        type="button"
        onClick={handlePageBack}
      >
        <Arrow
          className={`${style.colorArrow} ${
            buttonsCount !== null && currentPage > 1 ? style.enabledArrow : ''
          }`}
        />
      </button>

      {renderPageButtons()}

      <button
        className={`${style.arrowButton} ${
          buttonsCount !== null && currentPage < buttonsCount
            ? style.enabledButton
            : ''
        }`}
        type="button"
        onClick={handlePageNext}
      >
        <Arrow
          className={`${style.colorArrow} ${style.rotateArrow} ${
            buttonsCount !== null && currentPage < buttonsCount
              ? style.enabledArrow
              : ''
          }`}
        />
      </button>

      <button
        className={`${style.arrowButton} ${
          buttonsCount !== null && currentPage < buttonsCount
            ? style.enabledButton
            : ''
        }`}
        type="button"
        onClick={handleLastPage}
      >
        <DoubleArrow
          className={`${style.colorArrow} ${style.rotateArrow} ${
            buttonsCount !== null && currentPage < buttonsCount
              ? style.enabledArrow
              : ''
          }`}
        />
      </button>
    </div>
  );
}

export default PaginationUI;
