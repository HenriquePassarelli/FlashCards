import React, { useState } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogin } from "../Context/LoginContext"

type Props = {
    show?: boolean
}

const LoginModal = (props: Props) => {
    const { setIsLoggedIn } = useLogin()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [emailValidate, setEmailValidate] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [passwordValidate, setPasswordValidate] = useState<boolean>(false)

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: { currentTarget: any, preventDefault: () => any, stopPropagation: () => void }) => {
        event.preventDefault();
        event.stopPropagation();
        const emailLength = email.length === 0
        const passwordLength = password.length === 0
        validateEmail()
        validatePassword()

        if (emailValidate || passwordValidate || emailLength || passwordLength) {
            setValidated(false);
            return
        } else {
            setIsLoggedIn(true)
            setValidated(true);
            localStorage.setItem('flashcard/userId', "1");
            window.location.reload();
        }
    };

    const validateEmail = () => {
        const isValid = email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (isValid !== null) {
            setEmailValidate(false)
            return
        }
        setEmailValidate(true)

    }

    const validatePassword = () => {
        if (password.length > 8 && password.length < 20) {
            return setPasswordValidate(false)
        }
        setPasswordValidate(true)
    }

    return (
        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <FormControl type="email" placeholder="Enter email" onChange={(e: { target: { value: any; }; }): void => {
                            setEmail(e.target.value)
                        }} onBlur={validateEmail} isInvalid={emailValidate} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <FormControl type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e: { target: { value: any; }; }): void => {

                            setPassword(e.target.value)
                        }} onBlur={validatePassword} isInvalid={passwordValidate} />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long.
                        </Form.Text>
                        <Form.Check
                            type="checkbox"
                            id="checkbox"
                            label="Show password"
                            onChange={() => setShowPassword((showPassword) => !showPassword)}
                        />
                    </Form.Group>
                    <Button type='submit' variant="outline-primary" className="mr-5" >Sign up</Button><span className="ms-1 me-1"> or </span>
                    <Button type='submit' className="ml-5" >Login</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default LoginModal