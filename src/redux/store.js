import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/lib/persistStore'
import storage from "redux-persist/lib/storage"
import userReducer from './user/userSlice'

const reducers = combineReducers({
    user: userReducer,
})

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["user"]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    //Agregar middleware para que no se queje de que el estado no es serializable (por el persist)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)