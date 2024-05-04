import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// ---------------------------------------------------------------------------

export const lessonsApi = createApi({
    reducerPath: 'lessonsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3050' }),

    endpoints: (builder) => ({

        getLessons: builder.query({
            query: () => `lessons`,
            providesTags: ['lessons']
        }),

        addLesson: builder.mutation({
            query: (newLesson) => ({
                url: 'lessons',
                method: 'POST',
                body: newLesson
            }),
            invalidatesTags: ['lessons']
        }),

        removeLesson: builder.mutation({
            query: (lesson_id) => ({
                url: `lessons/${lesson_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['lessons']
        }),
        
    })
});


export const { useGetLessonsQuery, useAddLessonMutation, useRemoveLessonMutation } = lessonsApi