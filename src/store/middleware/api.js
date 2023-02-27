import axios from "axios"
import * as actions from '../actionCreators/api'
import timelineReducer from '../reducers/timelineReducer'
import { timeLineReceived } from '../reducers/timelineReducer'
import { timelinePickerUrl } from "../../assets/data/Apis/apis"

const api = ({ dispatch }) => next => async action => {

    if (action.type !== 'apiCallBegan') {
        return next(action)
    }

    const reducers = timelineReducer.reducer;

    next(action)
    const { url, data, method, onSuccess, onFailure } = action.payload

    try {
        const response = await axios.request({
            url: timelinePickerUrl,
            method,
            data
        });

        dispatch(actions.apiCallSuccess(response.data))
        if (onSuccess)
            dispatch(timeLineReceived({ payload: response.data.segments }))
    } catch (error) {
        dispatch(actions.apiCallFailed(error))
        if (onFailure)
            dispatch({ type: onFailure, payload: error })
    }

}

export default api;

