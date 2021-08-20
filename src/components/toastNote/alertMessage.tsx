import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

interface AlertMessageProps {
    message: string,
    show: boolean,
    styleVariant: string,
    setTriggerFalse: (e: any)=>void,
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
    message,
    show,
    styleVariant,
    setTriggerFalse
}) => {
    const [alertShow, setAlertShow] = useState(false);

    if (show && !alertShow) {
        setAlertShow(true);
    }

    useEffect(() => {
        if (alertShow) {
            window.setTimeout(() => { setAlertShow(false); setTriggerFalse(false) }, 3000)
        }
    }, [alertShow, setTriggerFalse])

    return(
        <Alert variant={styleVariant} show={alertShow}>
            {message}
        </Alert>
    )
}