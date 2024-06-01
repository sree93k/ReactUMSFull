import {combineReducers, configureStore} from '@reduxjs/toolkit'
import  adminReducer  from './adminSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage  from 'redux-persist/lib/storage'


const rootReducer=combineReducers({admin:adminReducer})

const persistConfig={
    key:'root',
    version:1,
    storage,
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const adminStore=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
    }),
})

export const persistor=persistStore(adminStore)