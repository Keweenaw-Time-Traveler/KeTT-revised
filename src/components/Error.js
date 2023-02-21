import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { defaultTimeline, timelineError } from '../assets/data/Errors/customMessages';

export default function Error() {


    const loading = useSelector((state) => state.timeline.loading);
    const timeLineError = useSelector((state) => state.timeline.error);
    useEffect(() => {
        if (timeLineError) {
            toast.error(timelineError); // display toast notification
            setTimeout(() => {
                toast.warning(defaultTimeline)
            }, 1000);
        }
    }, [timeLineError])


    return (
        <div>
            <ToastContainer />
        </div>
    );
}
