const logger = store => next => action => {
    console.log(store)
    next(action)
}

export default logger;