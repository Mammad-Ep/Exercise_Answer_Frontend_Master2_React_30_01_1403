import React from 'react';
import { useGetMastersQuery, useAddMasterMutation, useDeleteMasterMutation } from '../../app/services/MastersApi';
import styled from '../../css/main_style4.module.css';

const Masters = () => {
    const { data: masters, isLoading, isFetching, error } = useGetMastersQuery();
    const [addMaster, { isLoading: isAddMaster }] = useAddMasterMutation();
    const [deleteMaster, { isLoading: isDeleteMaster }] = useDeleteMasterMutation();

    const submitMasterHandler = (event) => {
        event.preventDefault();
        const master_personnel = Math.floor((Math.random() * 100000) + 7);
        let lessons = event.target['lessons-teacher'].value;
        let temp = [];
        
        const teaching_lessons = lessons.split('،');
        teaching_lessons.forEach(lesson => {
            temp.push(lesson.trim())
        });

        const master = {
            personnel_number: master_personnel,
            name: event.target['master-name'].value,
            family: event.target['master-family'].value,
            teaching_lessons: temp,
        }

        addMaster(master)
    }

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
        <div className={styled['masters-container']}>
            <div>
                <h2>لیست اساتید</h2>
                <table className={styled['table-master']}>
                    <tr>
                        <th>شماره پرسنلی</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>تدریس درس ها</th>
                        <th>خذف استاد</th>
                        {/* <th></th> */}
                    </tr>

                    {masters.map(master => (
                        <tr key={master.id}>
                            <td>{master.personnel_number}</td>
                            <td>{master.name}</td>
                            <td>{master.family}</td>
                            <td>{master.teaching_lessons.join('  -  ')}</td>
                            <td>
                                <button className={styled['delete-btn']} disabled={isDeleteMaster} onClick={() => deleteMaster(master.id)}>
                                    <i className='fa fa-trash'></i>
                                </button>
                            </td>
                            {/* <td>{}</td> */}
                        </tr>
                    ))}
                </table>
            </div>

            <div className={styled['master-form-box']}>
                <h2>ثبت استاد</h2>
                <form action="" className={styled['master-form']} onSubmit={(event) => submitMasterHandler(event)}>
                    <div className={styled['form-group']}>
                        <label htmlFor="master-name">نام استاد</label>
                        <input type="text" id='master-name' name='master-name' />
                    </div>
                    <div className={styled['form-group']}>
                        <label htmlFor="master-family">نام خانوادگی استاد</label>
                        <input type="text" id='master-family' name='master-family' />
                    </div>
                    <div className={styled['form-group']}>
                        <label htmlFor="lessons-teacher">درس های تدریس</label>
                        <input type="text" id='lessons-teacher' name='lessons-teacher' placeholder='درس ها با ، از هم جدا شوند' />
                    </div>
                    <div className={styled['form-group']}>
                        <button type="submit" disabled={isAddMaster}>ثبت استاد</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Masters