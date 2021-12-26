import React, { useState, Dispatch, SetStateAction } from "react";
import { Modal, Button, FormControl, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    show?: boolean
    onHide: () => void
}

const Settings = (props: Props) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')
    const [passwordValidate, setPasswordValidate] = useState<boolean>(false)
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false)

    const [city, setCity] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [name, setName] = useState<string>('')


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
        setValidated(true);
    };

    const firstPassword = () => {
        if (password.length > 8 && password.length < 20) {
            return setPasswordValidate(false)
        }
        setPasswordValidate(true)
    }
    const secondPassword = () => {
        if (checkPassword === password || checkPassword.length === 0) {
            return setPasswordMatch(false)
        }
        setPasswordMatch(true)
    }



    return (

        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isEdit ?

                    <Form validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>UserName</Form.Label>
                            <FormControl type="text" placeholder="type your name" value={name} onChange={(e: { target: { value: any; }; }) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <FormControl type="email" plaintext disabled value={"email.email.@email.com"} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Change Password</Form.Label>
                            <FormControl type={showPassword ? "text" : "password"} placeholder="Password" onBlur={firstPassword} onChange={(e: { target: { value: any; }; }) => setPassword(e.target.value)} isInvalid={passwordValidate} />
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must be 8-20 characters long.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <FormControl type={showPassword ? "text" : "password"} placeholder="Password" onBlur={secondPassword} onChange={(e: { target: { value: any; }; }) => setCheckPassword(e.target.value)} isInvalid={passwordMatch} />
                        </Form.Group>
                        <Form.Check
                            type="checkbox"
                            id="checkbox"
                            label="Show password"
                            onChange={() => setShowPassword((showPassword) => !showPassword)}
                        />
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" value={address} onChange={(e: { target: { value: any; }; }) => setAddress(e.target.value)} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control value={city} onChange={(e: { target: { value: any; }; }) => setCity(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>São Paulo</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Row>
                        <Button type='submit' className="me-3" onClick={() => setIsEdit(false)}>Save</Button>
                        <Button onClick={() => setIsEdit(false)} variant="outline-danger">Cancel</Button>

                    </Form> :

                    <Form validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>UserName</Form.Label>
                            <FormControl className="ms-3" type="text" plaintext disabled value={"my name"} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <FormControl className="ms-3"  type="email" plaintext disabled value={"email.email.@email.com"} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control className="ms-3" plaintext disabled placeholder="1234 Main St" value={address} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control plaintext disabled value={city} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control plaintext disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control plaintext disabled />
                            </Form.Group>
                        </Row>
                        <Button onClick={() => setIsEdit(true)}>Edit</Button>
                    </Form>

                }





            </Modal.Body>

        </Modal >
    )

}

export default Settings