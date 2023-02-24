import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { defaultTimeline, timelineError } from '../assets/data/Errors/customMessages';
import { removeError } from '../store/reducers/errorsSlice';

export default function Error() {


    const loading = useSelector((state) => state.timeline.loading);
    const timeLineError = useSelector((state) => state.timeline.error);
    const errors = useSelector((state) => state.errors)
    const dispatch = useDispatch();

    useEffect(() => {
        if (timeLineError) {
            toast.error(timelineError); // display toast notification
            setTimeout(() => {
                toast.warning(defaultTimeline)
            }, 1000);
        }
    }, [timeLineError])

    useEffect(() => {
        if (errors) {
            toast.error(errors)
            dispatch(removeError())
        }
    }, [errors])


    return (
        <div>
            <ToastContainer />
        </div>
    );
}
