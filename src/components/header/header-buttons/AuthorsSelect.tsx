import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setActivePage } from '../../../store/slices/paginationCount.slice';
import {
  setSelectedOption,
  setOptionsVisible,
  setSelectedOptionId,
} from '../../../store/slices/authorsSelect.slice';

import styles from './headerButtons.module.scss';

import { ReactComponent as More } from '../../../images/more.svg';
import { ReactComponent as Delete } from '../../../images/delete.svg';

import { useGetAuthorsQuery } from '../../../api/ApiService';

function AuthorsSelect({ placeHolder }: { placeHolder: string }) {
  const { data: authors } = useGetAuthorsQuery();

  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state: RootState) => state.authorsSelect.selectedOption,
  );
  const optionsVisible = useSelector(
    (state: RootState) => state.authorsSelect.optionsVisible,
  );
  const toggleOptions = () => {
    dispatch(setOptionsVisible(!optionsVisible));
  };

  const handleOptionSelect = (value: string) => {
    dispatch(setActivePage(1));
    dispatch(setSelectedOption(value));
    const selectedAuthor = authors?.find((author) => author.name === value);
    if (selectedAuthor) {
      dispatch(setSelectedOptionId(selectedAuthor.id.toString()));
    }
    toggleOptions();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(setSelectedOption(''));
    dispatch(setSelectedOptionId(''));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      toggleOptions();
    }
  };

  return (
    <div
      className={`${styles.custom} ${optionsVisible ? `${styles.open}` : ''}`}
    >
      <button
        className={styles.select}
        type="button"
        onClick={toggleOptions}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.spanText}>{selectedOption || placeHolder}</span>
        {selectedOption && (
          <Delete className={styles.delete} onClick={handleDelete} />
        )}
        <More className={styles.more} />
      </button>
      <ul
        className={`${styles.options} ${
          optionsVisible ? `${styles.visible}` : ''
        }`}
      >
        {authors?.map((author) => (
          <li
            key={author.name}
            role="option"
            aria-selected={author.name === selectedOption}
            onClick={() => handleOptionSelect(author.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleOptionSelect(author.name);
              }
            }}
          >
            {author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorsSelect;
