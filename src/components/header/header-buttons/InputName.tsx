import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../../../store/slices/paginationCount.slice';
import { setInputName } from '../../../store/slices/inputName.slice';

import styles from './headerButtons.module.scss';

function InputName() {
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActivePage(1));
    dispatch(setInputName(event.target.value));
  };

  return (
    <div className={styles.custom}>
      <input
        className={styles.select}
        type="text"
        placeholder="Name"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default InputName;
