import React, { Component } from 'react';
// ------------------------------------------------------
// // exersice4 

import {Link, Route, Routes, Navigate } from 'react-router-dom';
import styled from './css/main_style4.module.css';
import store from './app/store';
import { Provider } from 'react-redux';
import Students from './components/exersice4/Students';
import Masters from './components/exersice4/Masters';
import Lessons from './components/exersice4/Lessons';
import UnitSelection from './components/exersice4/UnitSelection';

// __________________________________________________________________________________

// // Exersice4

function App() {
    return (
        <>
            <div className={styled['main-container']}>
                <div className={styled['navbar']}>
                    <ul className={styled['nav']}>
                        <li className={styled['nav-item']}>
                            <Link to="/">دانشجویان</Link>
                        </li>
                        <li className={styled['nav-item']}>
                            <Link to="masters/">اساتید</Link>
                        </li>
                        <li className={styled['nav-item']}>
                            <Link to="lessons/">دروس</Link>
                        </li>
                        <li className={styled['nav-item']}>
                            <Link to="unit-selection/">انتخاب واحد</Link>
                        </li>
                    </ul>
                </div>

                <div className={styled['main-box']}>

                    <Routes>
                        <Route path='/' element={<Provider store={store}><Students/></Provider>}></Route>
                        <Route path='masters/' element={<Provider store={store}><Masters/></Provider>}></Route>
                        <Route path='lessons/' element={<Provider store={store}><Lessons/></Provider>}></Route>
                        <Route path='unit-selection/' element={<Provider store={store}><UnitSelection/></Provider>}></Route>
                    </Routes>
                </div>
            </div>
        </>
    );
}


export default App;