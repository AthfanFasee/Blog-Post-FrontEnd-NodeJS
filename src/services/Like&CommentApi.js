import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://blog-posts-1699.herokuapp.com/api/v1'
const token = localStorage.getItem('token');


const likeAndCommentApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({page, sort, UserIDParam }) => `/posts?page=${page}&sort=${sort}${UserIDParam}`,
      providesTags: ['Post'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: ({title, postText}) => ({
        url: `/posts`,
        method: 'POST',
        body: {title, postText},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export default likeAndCommentApi;

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation
} = likeAndCommentApi;
