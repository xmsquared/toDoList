import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DefaultNote, NoteDetail, NoteType } from '../../interface';

interface AlertMessageProps {
    show: boolean,
    setTriggerFalse: (e: boolean)=>void,
    noteDetail: NoteDetail,
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
    show,
    setTriggerFalse,
    noteDetail
}) => {
    
    useEffect(() => {
        if (show && noteDetail !== DefaultNote) {
            switch(noteDetail.type){
                case NoteType.success:
                    toast.success(noteDetail.message);
                    break;
                case NoteType.failure:
                    toast.error(noteDetail.message);
                    break;
                case NoteType.information:
                    toast.info(noteDetail.message);
                    break;
            }
            setTriggerFalse(false);
            // window.setTimeout(() => { setTriggerFalse(false) }, 3000)
        }
    }, [noteDetail, setTriggerFalse, show])


    return(
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
        />
    )
}