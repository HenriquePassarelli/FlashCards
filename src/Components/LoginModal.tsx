import React, { useState, Dispatch, SetStateAction } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";

type Props = {
    show?: boolean,
    close: Dispatch<SetStateAction<boolean>>
}

const LoginModal = (props: Props) => {



    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: { currentTarget: any, preventDefault: () => any, stopPropagation: () => void }) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(false);
            return

        }
        props.close(true)
        setValidated(true);
    };

    return (
        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <FormControl type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <FormControl type="password" placeholder="Password" required />
                    </Form.Group>
                    <Button type='submit' variant="outline-primary" className="mr-5" >Sign up</Button><span className="ms-1 me-1"> or </span>
                    <Button type='submit' className="ml-5" >Login</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default LoginModal