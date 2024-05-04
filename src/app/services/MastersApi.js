import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mastersApi = createApi({
    reducerPath: 'mastersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3040' }),

    endpoints: (builder) => ({

        getMasters: builder.query({
            query: () => `masters`,
            providesTags: ['masters']
        }),

        addMaster: builder.mutation({
            query: (newMaster) => ({
                url: 'masters',
                method: 'POST',
                body: newMaster
            }),

            invalidatesTags: ['masters']
        }),

        deleteMaster: builder.mutation({
            query: (master_id) => ({
                url: `masters/${master_id}`,
                method: 'DELETE',
            }),

            invalidatesTags: ['masters']
        }),

    })
});


export const { useGetMastersQuery, useAddMasterMutation, useDeleteMasterMutation } = mastersApi
