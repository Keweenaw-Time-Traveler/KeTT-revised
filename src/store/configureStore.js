import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
// import arcgisMiddleware from './middleware/arcgisMiddleware';
import reducer from './reducers/entity';
import api from './middleware/api'


// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger)
    },);
}