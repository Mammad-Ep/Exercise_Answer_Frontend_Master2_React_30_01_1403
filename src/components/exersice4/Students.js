import React from 'react';
import styled from '../../css/main_style4.module.css';
import { useGetStudentsQuery, useAddStudentMutation, useDeleteStudentMutation } from '../../app/services/StudentsApi';
// ---------------------------------------------------------------------------

const Students = () => {
    const { data: students, isLoading, isFetching, error } = useGetStudentsQuery();
    const [addStudent, { isLoading: isAddStudent }] = useAddStudentMutation();
    const [deleteStudent, { isLoading: isDeleteStudent }] = useDeleteStudentMutation();

    const submitStudentHandler = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const student_id = Math.floor((Math.random() * 1000) + 7)
        let student = {
            student_id: student_id,
            name: form.get('student-name'),
            family: form.get('student-family'),
            field_of_study: form.get('student-study'),

            number_of_units: 0,
            lessons_list: []
        }

        // console.log(form.get('student-family'))
        addStudent(student);

    };

    if (error) {
        return (
            <h3>Error is: {error.message}</h3>
        )
    }

    if (isFetching || isLoading) {
        return (
            <p>Loading ...</p>
        )
    }
    return (
        <div className={styled['students-container']}>
            <div>
                <h2>لیست دانشجویان</h2>
                <table className={styled['table-student']}>
                    <tr>
                        <th>شماره دانشجویی</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>رشته تحصیلی</th>
                        <th>خذف دانشجو</th>
                        {/* <th></th> */}
                    </tr>

                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.student_id}</td>
                            <td>{student.name}</td>
                            <td>{student.family}</td>
                            <td>{student.field_of_study}</td>
                            <td>
                                <button className={styled['delete-btn']} disabled={isDeleteStudent} onClick={() => deleteStudent(student.id)}>
                                    <i className='fa fa-trash'></i>
                                </button>
                            </td>
                            {/* <td>{}</td> */}
                        </tr>
                    ))}
                </table>
            </div>

            <div className={styled['student-form-box']}>
                <h2>ثبت دانشجو</h2>
                <form action="" className={styled['student-form']} onSubmit={(event) => submitStudentHandler(event)}>
                    <div className={styled['form-group']}>
                        <label htmlFor="student-name">نام دانشجو</label>
                        <input type="text" id='student-name' name='student-name' />
                    </div>
                    <div className={styled['form-group']}>
                        <label htmlFor="student-family">نام خانوادگی دانشجو</label>
                        <input type="text" id='student-family' name='student-family' />
                    </div>
                    <div className={styled['form-group']}>
                        <label htmlFor="student-study">رشته تحصیلی دانشجو</label>
                        <input type="text" id='student-study' name='student-study' />
                    </div>
                    <div className={styled['form-group']}>
                        <button type="submit" disabled={isAddStudent}>ثبت دانشجو</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Students