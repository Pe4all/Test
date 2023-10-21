import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setActivePage } from '../../../store/slices/paginationCount.slice';
import {
  setSelectedOption,
  setOptionsVisible,
  setSelectedOptionId,
} from '../../../store/slices/locationsSelcet.slice';

import styles from './headerButtons.module.scss';

import { ReactComponent as More } from '../../../images/more.svg';
import { ReactComponent as Delete } from '../../../images/delete.svg';

import { useGetLocationsQuery } from '../../../api/ApiService';

function CustomSelect({ placeHolder }: { placeHolder: string }) {
  const { data: locations } = useGetLocationsQuery();

  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state: RootState) => state.locationsSelect.selectedOption,
  );
  const optionsVisible = useSelector(
    (state: RootState) => state.locationsSelect.optionsVisible,
  );

  const toggleOptions = () => {
    dispatch(setOptionsVisible(!optionsVisible));
  };

  const handleOptionSelect = (value: string) => {
    dispatch(setActivePage(1));
    dispatch(setSelectedOption(value));
    const selectedLocation = locations?.find(
      (location) => location.location === value,
    ); // Обратите внимание на условный оператор '?'
    if (selectedLocation) {
      dispatch(setSelectedOptionId(selectedLocation.id.toString())); // Преобразование id в строку
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
        {locations?.map((location) => (
          <li
            key={location.location}
            role="option"
            aria-selected={location.location === selectedOption}
            onClick={() => handleOptionSelect(location.location)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleOptionSelect(location.location);
              }
            }}
          >
            {location.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
