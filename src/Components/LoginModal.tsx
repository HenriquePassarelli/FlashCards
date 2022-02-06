import React, { useState, useMemo } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogin } from "../Context/LoginContext"
import _ from 'lodash'

type Props = {
    show?: boolean
}

const LoginModal = (props: Props) => {
    const { setIsLoggedIn } = useLogin()
    const [singUp, setSingUp] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [emailValidate, setEmailValidate] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [passwordValidate, setPasswordValidate] = useState<boolean>(false)


    const [validated, setValidated] = useState(false);



    const handleSubmit = (event: { currentTarget: any, preventDefault: () => any, stopPropagation: () => void }) => {
        event.preventDefault();
        event.stopPropagation();
        let checkLength = email.length === 0 && password.length === 0
        if (singUp) checkLength = checkLength && confirmPassword.length === 0

        validateEmail()
        validatePassword()
        console.log(checkLength)
        if (emailValidate || passwordValidate || checkLength || validatePasswordMatch) {
            setValidated(false);
            return
        } else {
            /* setIsLoggedIn(true)
            setValidated(true);
            localStorage.setItem('flashcard/userId', "1");
            window.location.reload(); */
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
        if (password.length >= 8 && password.length < 20) {
            return setPasswordValidate(false)
        }
        setPasswordValidate(true)
    }

    const validatePasswordMatch = useMemo(() => {
        if (password.length >= 8 && password.length < 20 && confirmPassword.length > 0) {

            return !(confirmPassword === password)
        }
        else {

            return false

        }
    }, [confirmPassword, password])


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
                    </Form.Group>
                    {singUp && <Form.Group className="mb-3" controlId="fromGroupPasswordCheck">
                        <Form.Label>Password Check</Form.Label>
                        <FormControl type={showPassword ? "text" : "password"} placeholder="Check Password" onChange={(e: { target: { value: any; }; }): void => {

                            setConfirmPassword(e.target.value)
                        }} isInvalid={validatePasswordMatch} />
                    </Form.Group>}
                    <Form.Check
                        type="checkbox"
                        id="checkbox"
                        label="Show password"
                        onChange={() => setShowPassword((showPassword) => !showPassword)}
                    />
                    <Button type='button' variant="outline-none" className="mr-5" onClick={() => setSingUp(state => !state)}>Sign up</Button><span className="ms-1 me-1"> or </span>
                    <Button type='submit' className="ml-5" >{singUp ? 'Register' : 'Login'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default LoginModal