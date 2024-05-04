import React from 'react';
import { useGetLessonsQuery, useAddLessonMutation, useRemoveLessonMutation } from '../../app/services/LessonsApi';
import styled from '../../css/main_style4.module.css';
// ---------------------------------------------------------------------------

const Lessons = () => {
    const { data: lessons, error, isLoading, isFetching } = useGetLessonsQuery();
    const [addLesson, { isLoading: isAddLesson }] = useAddLessonMutation();
    const [removeLesson, { isLoading: isRemoveLesson }] = useRemoveLessonMutation();

    const submitLessonHandler = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const lesson={
            lesson_name:form.get('lesson-name'),
            lesson_code:form.get('lesson-code'),
            unit:form.get('lesson-unit'),
            teacher:form.get('lesson-teacher'),
        }

        addLesson(lesson)
    };

    if (error) {
        return(
            <p>Error is: {error.message}</p>
        )
    }

    if (isFetching || isLoading) {
        return(
            <p>isLoading...</p>
        )
    }

    return (
        <div className={styled['lessons-container']}>
            <div>
                <h2>لیست درس ها</h2>
                <table className={styled['table-lesson']}>
                    <tr>
                        <th>کد درس</th>
                        <th>نام درس</th>
                        <th>تعداد واحد</th>
                        <th>استاد درس</th>
                        <th>خذف درس</th>
                        {/* <th></th> */}
                    </tr>

                    {lessons.map(lesson => (
                        <tr key={lesson.id}>
                            <td>{lesson.lesson_code}</td>
                            <td>{lesson.lesson_name}</td>
                            <td>{lesson.unit}</td>
                            <td>{lesson.teacher}</td>
                            <td>
                                <button className={styled['delete-btn']} disabled={isRemoveLesson} onClick={() => removeLesson(lesson.id)}>
                                    <i className='fa fa-trash'></i>
                                </button>
                            </td>
                            {/* <td>{}</td> */}
                        </tr>
                    ))}
                </table>
            </div>

            <div className={styled['lesson-form-box']}>
                <h2>ثبت درس</h2>
                <form action="" className={styled['lesson-form']} onSubmit={(event) => submitLessonHandler(event)}>
                    <div className={styled['form-group']}>
                        <label htmlFor="lesson-name">نام درس</label>
                        <input type="text" id='lesson-name' name='lesson-name' />
                    </div>
                    <div className={styled['form-group']}>
                        <label htmlFor="lesson-code">کد درس</label>
                        <input type="number" id='lesson-code' name='lesson-code' />
                    </div>
                    <div className={styled['form-group']}>
                        <label htmlFor="lesson-unit">تعداد واحد</label>
                        <input type="number" id='lesson-unit' name='lesson-unit' />
                    </div>
                    <div className={styled['form-group']}>
                        <label htmlFor="lesson-teacher">استاد درس</label>
                        <input type="text" id='lesson-teacher' name='lesson-teacher' />
                    </div>
                    <div className={styled['form-group']}>
                        <button type="submit" disabled={isAddLesson}>ثبت درس</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Lessons