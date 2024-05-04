import { configureStore } from '@reduxjs/toolkit';
import { studentsApi } from './services/StudentsApi';
import { mastersApi } from './services/MastersApi';
import { lessonsApi } from './services/LessonsApi';
// ---------------------------------------------------------------------------

const store = configureStore({
    reducer: {
        [studentsApi.reducerPath]: studentsApi.reducer,
        [mastersApi.reducerPath]: mastersApi.reducer,
        [lessonsApi.reducerPath]: lessonsApi.reducer,
    },

    middleware: (getDefaultMiddlware) => getDefaultMiddlware()
        .concat(studentsApi.middleware, mastersApi.middleware, lessonsApi.middleware)
})

export default store;