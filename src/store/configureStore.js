import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import reducer from './reducers/entity';


// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger)
    },);
}