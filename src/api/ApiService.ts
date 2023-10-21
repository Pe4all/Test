import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Painting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface Location {
  id: number;
  location: string;
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team' }),
  serializeQueryArgs: (args) => JSON.stringify(args),
  endpoints: (builder) => ({
    getPaintings: builder.query<
      Painting[],
      {
        inputName: string;
        authorsSelect: string;
        locationsSelect: string;
        after: string;
        before: string;
      }
    >({
      query: ({ inputName, authorsSelect, locationsSelect, after, before }) =>
        `paintings?q=${inputName}${
          authorsSelect ? `&authorId=${authorsSelect}` : ''
        }${locationsSelect ? `&locationId=${locationsSelect}` : ''}${
          after ? `&created_gte=${after}` : ''
        }${before ? `&created_lte=${before}` : ''}`,
    }),
    getFilteredPaintings: builder.query<
      Painting[],
      {
        inputName: string;
        authorsSelect: string;
        locationsSelect: string;
        after: string;
        before: string;
        currentPage: string;
      }
    >({
      query: ({
        inputName,
        authorsSelect,
        locationsSelect,
        after,
        before,
        currentPage,
      }) =>
        `paintings?q=${inputName}${
          authorsSelect ? `&authorId=${authorsSelect}` : ''
        }${locationsSelect ? `&locationId=${locationsSelect}` : ''}${
          after ? `&created_gte=${after}` : ''
        }${before ? `&created_lte=${before}` : ''}&_limit=12${
          currentPage ? `&_page=${currentPage}` : ''
        }`,
    }),
    getAuthors: builder.query<Author[], void>({
      query: () => 'authors',
    }),
    getLocations: builder.query<Location[], void>({
      query: () => 'locations',
    }),
  }),
});

export default api;

export const {
  useGetPaintingsQuery,
  useGetFilteredPaintingsQuery,
  useGetAuthorsQuery,
  useGetLocationsQuery,
} = api;
