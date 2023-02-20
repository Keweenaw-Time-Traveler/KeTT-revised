const logger = store => next => action => {
    // console.log(store.getDefaultMiddleware)
    next(action)
}

export default logger;