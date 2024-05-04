import React, { useState } from 'react';
import styled from '../../css/main_style4.module.css';
import { useGetStudentsQuery, useUpdateStudentMutation } from '../../app/services/StudentsApi';
import { useGetLessonsQuery } from '../../app/services/LessonsApi';
// ---------------------------------------------------------------------------

const UnitSelection = () => {
    const { data: lessons, error: isLessonError, isLoading: isLessonLoading, isFetching: isLessonFetching } = useGetLessonsQuery();
    const { data: students, isLoading, isFetching, error } = useGetStudentsQuery();
    const [updateStudent, { isLoading: isComplateUpdate }] = useUpdateStudentMutation()
    const [selectStudent, SetSelectStudent] = useState();
    const [lessonStudent, SetLessonStudent] = useState([]);
    const [unitStudent, SetUnitStudent] = useState(0);


    const selectStudentHandler = (e) => {
        const student_filter = students.filter(s => (
            s.student_id == e.target.value
        ));

        const student = student_filter[0]
        SetSelectStudent(student);
        SetLessonStudent(student.lessons_list);
        SetUnitStudent(student.number_of_units)
    };

    const add_lesson_selection = (lesson) => {

        if (lessonStudent.length > 0) {
            const flag = lessonStudent.filter(les => (
                les.lesson_name == lesson.lesson_name
            ))

            if (flag.length > 0) {
                alert('این درس قبلا انتخاب شده')
            } else {
                const temp = unitStudent + Number(lesson.unit);
                if (temp <= 20) {
                    SetLessonStudent([...lessonStudent, lesson]);
                    SetUnitStudent((prev) => prev += Number(lesson.unit))
                } else {
                    alert('شما بیشتر از 20 نمیتوانید انتخاب واحد کنید')
                }

            }
        } else {
            SetLessonStudent([...lessonStudent, lesson]);
            SetUnitStudent((prev) => prev += Number(lesson.unit))
        }
    };

    const deleteLessonHandler = (lesson_name) => {

        SetLessonStudent(list => list.filter(les => (
            les.lesson_name != lesson_name
        )))
    }

    const complateUnitSelection = () => {
        updateStudent({
            id: selectStudent.id,
            lessons_list: lessonStudent,
            number_of_units: unitStudent
        });


        alert(`انتخاب واحد شما (${selectStudent.name} ${selectStudent.family}) ثبت نهایی شد.`)
    }

    if (isFetching || isLoading || isLessonFetching || isLessonLoading) {
        return (
            <h3>Loading ....</h3>
        )
    }

    if (error || isLessonError) {
        return (
            <h3>Error is : {error.message}</h3>
        )
    }
    return (
        <div className={styled['container']}>

            <div className={styled['unit-form-box']}>
                <div className={styled['form-group']}>
                    <label htmlFor="select-student">انتخاب دانشجو: </label>
                    <select name="select-student" id="select-student" onChange={(e) => selectStudentHandler(e)}>
                        <option value="0" selected hidden>یک دانشجو را انتخاب کن</option>
                        {students.map(s => (
                            <option key={s.id} value={s.student_id}>{`${s.name} ${s.family}`}</option>
                        ))}
                    </select>
                </div>
                <br />
                {selectStudent && (
                    <div>
                        <h4>☼ اطلاعات دانشجو ☼</h4>
                        <p>شماره دانشجویی: <strong>{selectStudent.student_id}</strong></p>
                        <p>نام و نام خانوادگی: <strong>{selectStudent.name} {selectStudent.family}</strong></p>
                        <p>رشته تحصیلی: <strong>{selectStudent.field_of_study}</strong></p>

                        {lessonStudent.length > 0 && (
                            <div>
                                <p>تعداد واحد های انتخاب شده : <strong>{unitStudent}</strong></p>
                                <table className={styled['table-unit-selection']}>
                                    <tr>
                                        <th>کد درس</th>
                                        <th>نام درس</th>
                                        <th>تعداد واحد</th>
                                        <th>استاد درس</th>
                                        <th>خذف درس</th>
                                    </tr>
                                    {lessonStudent.map((lesson) => (
                                        <tr key={lesson.id}>
                                            <td>{lesson.lesson_code}</td>
                                            <td>{lesson.lesson_name}</td>
                                            <td>{lesson.unit}</td>
                                            <td>{lesson.teacher}</td>
                                            <td>
                                                <button className={styled['delete-btn']} onClick={() => deleteLessonHandler(lesson.lesson_name)}>
                                                    <i className='fa fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                                <p className={styled['help-unit']}>*نکته : بعد از تکمیل دروس انتخاب واحد ، دکمه <span>" ثبت نهایی "</span> را حتما بزنید تا انتخاب واحد شما نهایی و تکمیل شود.</p>
                                <button type="button" className={styled['btn-complate']} onClick={complateUnitSelection}>ثبت نهایی انتخاب واحد</button>
                            </div>
                        )}
                    </div>
                )}
            </div>



            {selectStudent && (
                <div>
                    <h2>لیست درس های انتخاب واحد</h2>
                    <table className={styled['table-uni']}>
                        <tr>
                            <th>کد درس</th>
                            <th>نام درس</th>
                            <th>تعداد واحد</th>
                            <th>استاد درس</th>
                            <th>انتخاب درس</th>
                        </tr>

                        {lessons.map(lesson => (
                            <tr key={lesson.id}>
                                <td>{lesson.lesson_code}</td>
                                <td>{lesson.lesson_name}</td>
                                <td>{lesson.unit}</td>
                                <td>{lesson.teacher}</td>
                                <td>
                                    <button className={''} disabled={false} onClick={() => add_lesson_selection(lesson)}>
                                        انتخاب درس
                                    </button>
                                </td>
                            </tr>
                        ))
                        }


                    </table>
                </div>
            )}


        </div>
    )
}

export default UnitSelection


