import React, { useState, useMemo } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogin } from "../Context/LoginContext"
import  useToken  from '../hooks/useToken'
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../Helpers/loginUser"
import _ from 'lodash'


type Props = {
    show?: boolean
}

type Inputs = {
    email: string
    password: string
    checkPassword: string
}

const LoginModal = (props: Props) => {
    const { setToken,token } = useToken()
    const [singUp, setSingUp] = useState<boolean>(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [validated, setValidated] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        const token = await loginUser(data)

        setToken(token)

        console.log(token)
        // setIsLoggedIn(true)
        // setValidated(true);
        // localStorage.setItem('flashcard/userId', "1");
        // window.location.reload();
    };


    console.log(token)

    return (
        <Modal {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <FormControl type="email" placeholder="Enter email" {...register("email", { required: "You must specify an email" })} isInvalid={errors.email ? true : false} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <FormControl type={showPassword ? "text" : "password"}  {...register("password", {
                            required: "You must specify a password", minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })} placeholder="Password" />
                        <Form.Text id="passwordHelpBlock" muted>
                            {_.get(errors, 'password.message')}
                        </Form.Text>
                    </Form.Group>
                    {singUp && <Form.Group className="mb-3" controlId="fromGroupPasswordCheck">
                        <Form.Label>Password Check</Form.Label>
                        <FormControl type={showPassword ? "text" : "password"} placeholder="Check Password" {...register("checkPassword", {
                            required: true, validate: value =>
                                value === watch("password") || "The passwords do not match"
                        })} />
                        <Form.Text id="passwordHelpBlock" muted>
                            {_.get(errors, 'checkPassword.message')}
                        </Form.Text>
                    </Form.Group>}

                    <Form.Check
                        type="checkbox"
                        id="checkbox"
                        className="mb-3" label="Show password"
                        onChange={() => setShowPassword((showPassword) => !showPassword)}
                    />
                    <Button variant="outline-none" className="me-4 btn-link" onClick={() => setSingUp(state => !state)}>{!singUp ? 'Sign up' : 'Back'}</Button>
                    <Button type='submit' className="ps-5 pe-5" >{singUp ? 'Register' : 'Login'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default LoginModal