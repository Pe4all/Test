import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setActivePage } from '../../../store/slices/paginationCount.slice';
import {
  toggleForm,
  setAfter,
  setBefore,
} from '../../../store/slices/createdForm.slice';

import styles from './headerButtons.module.scss';

import { ReactComponent as More } from '../../../images/more.svg';
import { ReactComponent as Line } from '../../../images/line.svg';

function InputeYear({ placeHolder }: { placeHolder: string }) {
  const dispatch = useDispatch();
  const formVisible = useSelector(
    (state: RootState) => state.createdForm.formVisible,
  );

  const after = useSelector((state: RootState) => state.createdForm.after);
  const before = useSelector((state: RootState) => state.createdForm.before);

  const handleToggleForm = () => {
    dispatch(toggleForm());
  };

  const handleAfterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActivePage(1));
    const value = parseInt(event.target.value, 10);
    dispatch(setAfter(Number.isNaN(value) ? '' : value.toString()));
  };

  const handleBeforeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActivePage(1));
    const value = parseInt(event.target.value, 10);
    dispatch(setBefore(Number.isNaN(value) ? '' : value.toString()));
  };

  return (
    <div className={`${styles.custom} ${formVisible ? styles.openForm : ''}`}>
      <button
        className={styles.select}
        onClick={handleToggleForm}
        type="button"
      >
        <span>{placeHolder}</span>
        <More className={styles.more} />
      </button>
      <div
        className={`${styles.invisible} ${
          formVisible ? styles.openFormYear : ''
        }`}
      >
        <input
          className={`${styles.formSelect} ${
            formVisible ? styles.formInput : ''
          }`}
          type="number"
          placeholder="from"
          value={after || ''}
          onChange={handleAfterChange}
        />
        <Line className={styles.line} />
        <input
          className={`${styles.formSelect} ${
            formVisible ? styles.formInput : ''
          }`}
          type="number"
          placeholder="before"
          value={before || ''}
          onChange={handleBeforeChange}
        />
      </div>
    </div>
  );
}

export default InputeYear;
