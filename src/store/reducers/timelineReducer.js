import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'timelineReducer',
    initialState: {
        isLoading: false,
        error: null,
        data: null
    },
    reducers: {
        timeLineSuccess: (timelineData, action) => {
            timelineData.isLoading = true
        },
        timeLineReceived: (timelineData, action) => {
            console.log("Timeline action is ", action.payload.payload);
            timelineData.data = action.payload.payload
            // console.log;
            timelineData.isLoading = true
        },
        timeLineFailed: (timelineData, action) => {
            timelineData.data = null
        }

    }
})
// console.log(slice)

export const { timeLineReceived, timeLineFailed, timeLineSuccess } = slice.actions;
export default slice;
