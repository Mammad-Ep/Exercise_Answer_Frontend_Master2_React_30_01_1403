import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030' }),

    endpoints: (builder) => ({

        getStudents: builder.query({
            query: () => `students`,
            providesTags: ['students']
        }),

        addStudent: builder.mutation({
            query: (newStudent) => ({
                url: 'students',
                method: 'POST',
                body: newStudent
            }),
            invalidatesTags: ['students']
        }),

        deleteStudent: builder.mutation({
            query: (student_id) => ({
                url: `students/${student_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['students']
        }),

        // updateStudent: builder.mutation({
        //     query: (id, updateStudent) => ({
        //         url: `students/${id}`,
        //         method: 'PUT',
        //         body:  updateStudent 
        //     }),
        //     invalidatesTags: ['students']
        // })
        
        updateStudent: builder.mutation({
            query: ({ id, lessons_list, number_of_units }) => ({
                url: `students/${id}`,
                method: 'PATCH',
                body: {
                    lessons_list,
                    number_of_units
                }
            }),
            invalidatesTags: ['students']
        })
    })
})


export const { useGetStudentsQuery, useAddStudentMutation, useDeleteStudentMutation, useUpdateStudentMutation } = studentsApi