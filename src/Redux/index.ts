import {
    createSlice,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

export interface State {
    name: string | null;
    studentId: string | null;
    image: string | null;
}

const initialState: State = {
    name: null,
    studentId: null,
    image: null,
};

const reducers = {
    setName: (state: any, { payload: name }: { payload: string | null }) => {
        state.name = name;
    },
    setStudentId: (
        state: any,
        { payload: studentId }: { payload: string | null }
    ) => {
        state.studentId = studentId;
    },
    setImage: (state: any, { payload: image }: { payload: string | null }) => {
        state.image = image;
    },
};

const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers,
});

const persistConfig = {
    key: 'state',
    storage,
    stateReconciler: hardSet,
};

export const { actions } = stateSlice;

const reducer = (state: any, action: any) => stateSlice.reducer(state, action);

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    ] /* devTools: false*/,
});
export const persistor = persistStore(store);
