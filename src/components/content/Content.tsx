import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setTotalCount } from '../../store/slices/paginationCount.slice';

import style from './content.module.scss';

import {
  useGetPaintingsQuery,
  useGetFilteredPaintingsQuery,
  useGetAuthorsQuery,
  useGetLocationsQuery,
} from '../../api/ApiService';

interface PaintingType {
  authorId: number;
  locationId: number;
}

function Content() {
  const dispatch = useDispatch();

  const inputName = useSelector(
    (state: RootState) => state.inputName.inputName,
  );

  const authorsSelect = useSelector(
    (state: RootState) => state.authorsSelect.selectedOptionId,
  );

  const locationsSelect = useSelector(
    (state: RootState) => state.locationsSelect.selectedOptionId,
  );

  const after = useSelector((state: RootState) => state.createdForm.after);
  const before = useSelector((state: RootState) => state.createdForm.before);

  const currentPage = useSelector(
    (state: RootState) => state.pagination.activePage,
  );

  const { data: authors, isLoading: authorsLoading } = useGetAuthorsQuery();
  const { data: locations, isLoading: locationsLoading } =
    useGetLocationsQuery();

  const { data: allPaintings } = useGetPaintingsQuery({
    inputName,
    authorsSelect: authorsSelect === null ? '' : authorsSelect,
    locationsSelect: locationsSelect === null ? '' : locationsSelect,
    after: after === null ? '' : after,
    before: before === null ? '' : before,
  });

  const { data: paintings, isLoading: paintingsLoading } =
    useGetFilteredPaintingsQuery({
      inputName,
      authorsSelect: authorsSelect === null ? '' : authorsSelect,
      locationsSelect: locationsSelect === null ? '' : locationsSelect,
      after: after === null ? '' : after,
      before: before === null ? '' : before,
      currentPage: currentPage.toString(),
    });

  const paintingsPerPage = useSelector(
    (state: RootState) => state.pagination.paintingsPerPage,
  );

  if (allPaintings) {
    dispatch(setTotalCount(Math.ceil(allPaintings.length / paintingsPerPage)));
  }

  if (paintingsLoading || authorsLoading || locationsLoading) {
    return <div>Loading...</div>;
  }

  function getAuthorForPainting(painting: PaintingType | null) {
    return authors?.find((author) => author.id === painting?.authorId);
  }

  function getLocationForPainting(painting: PaintingType | null) {
    return locations?.find((location) => location.id === painting?.locationId);
  }

  return (
    <div className={style.artsList}>
      {paintings?.map((painting) => {
        const currentAuthor = getAuthorForPainting(painting);
        const currentLocation = getLocationForPainting(painting);
        return (
          <div
            className={style.art}
            key={painting.id}
            style={{
              backgroundImage: `url(https://test-front.framework.team/${painting.imageUrl})`,
            }}
          >
            <div className={style.artInfo}>
              <p className={style.artName}>{painting.name}</p>
              <p className={style.artProperties}>
                Author:{' '}
                <span className={style.artProperty}>{currentAuthor?.name}</span>
              </p>
              <p className={style.artProperties}>
                Created:{' '}
                <span className={style.artProperty}>{painting.created}</span>
              </p>
              <p className={style.artProperties}>
                Location:{' '}
                <span className={style.artProperty}>
                  {currentLocation?.location}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Content;
