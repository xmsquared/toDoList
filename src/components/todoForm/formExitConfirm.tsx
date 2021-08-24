import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useCallback } from "react";

interface FormExitConfirmProps {
    setTodoShow: (e: boolean)=>void,
    showConfirm: boolean,
    setShowConfirm: (e: boolean)=>void,
    clearInput: ()=>void,
}

export const FormExitConfirm: React.FC<FormExitConfirmProps> = ({
    showConfirm,
    setTodoShow,
    setShowConfirm,
    clearInput,
}) => {
    
    const closeAll = useCallback(
        () => {
            clearInput();
            setTodoShow(false);
            setShowConfirm(false);
        },
        [clearInput, setShowConfirm, setTodoShow]
    )

    return (
        
        <Modal 
            show={ showConfirm }
            onHide={ () => setShowConfirm(false) }
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to leave?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                No changes will be saved!
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ () => setShowConfirm(false) }>
                    Close
                </Button>

                <Button variant="primary" onClick = { closeAll }>Understood</Button>
            </Modal.Footer>

        </Modal>
    )
}