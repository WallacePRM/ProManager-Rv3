import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../services/api/auth-service";
import * as Yup from 'yup';
import LayoutPage from "../../layouts/LayoutPage";
import Form from "../../Form";
import TextField from "../../Form/TextField";

const Signup = () => {

    const navigate = useNavigate();

    const handleSignup = async (formData: FormData) => {

        try {

            const data = {
                email: formData.email,
                password: formData.password
            };

            await signup(data);
            navigate('/login');
        }
        catch(error) {
            console.error(error);
            alert('Error');
        }
    };

    const signupSchema = Yup.object().shape({
        email: Yup.string()
        .max(50, 'Máximo de 50 caracteres')
        .required('Requerido'),
        password: Yup.string()
        .min(6, 'Mínimo de 6 caracteres')
        .max(50, 'Máximo de 50 caracteres')
        .required('Requerido'),
        confirm_password: Yup.string()
        .min(6, 'Mínimo de 6 caracteres')
        .max(50, 'Máximo de 50 caracteres')
        .required('Requerido'),
    });

    // HTML
    const signupHeader = () => {
        return (
            <>
                <span>Ja possui uma conta?</span>
                <Link to="/Login" className="link btn btn-primary">Entrar</Link>
            </>
        );
    };

    return (
        <LayoutPage header={signupHeader()} title={'Registrar-se'}>
            <Form onSubmit={handleSignup}
            initialValues={initialValues}
            validationSchema={signupSchema}>
                <>
                <Form.Header>
                    <h3>Vamos começar!</h3>
                </Form.Header>
                <Form.Content>
                    <>
                        <TextField name="email" label="E-mail *" type="email" placeholder="example@site.com"/>
                        <TextField name="password" label="Senha *" type="password" placeholder="*****"/>
                        <TextField name="confirm_password" label="Confirmar senha *" type="password" placeholder="*****"/>
                    </>
                </Form.Content>
                <Form.Footer>
                    <button type="submit" className="link btn btn-primary">Criar uma conta de graça</button>
                </Form.Footer>
                </>
            </Form>
        </LayoutPage>
    );
};

const initialValues: FormData = {
    email: '',
    password: '',
    confirm_password: ''
};

type FormData = {
    email: string;
    password: string;
    confirm_password: string;
};

export default Signup;