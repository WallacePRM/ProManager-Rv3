import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import * as Yup from 'yup';
import { login } from "../../../services/api/auth-service";
import { getLocalToken, setLocalToken } from "../../../services/token";
import LayoutPage from "../../layouts/LayoutPage";
import Form from "../../Form";
import TextField from "../../Form/TextField";

const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const isLogged = getLocalToken() !== null;
        if (isLogged) {
            navigate('/projects');
        }
    }, []);

    const signupSchema = Yup.object().shape({
        email: Yup.string()
        .max(50, 'Máximo de 50 caracteres')
        .required('Requerido'),
        password: Yup.string()
        .min(6, 'Mínimo de 6 caracteres')
        .max(50, 'Máximo de 50 caracteres')
        .required('Requerido')
    });

    const handleLogin = async (formData: FormData) => {

        try {
            const result = await login(formData);
            setLocalToken(result.token);

            navigate('/projects');
        }
        catch(error) {
            console.error(error);
            alert('Falha no login');
        }
    };

    const loginHeader = () => {
        return (
            <>
                <span>Não tem uma conta?</span>
                <Link to="/signup" className="link btn btn-primary">Criar conta</Link>
            </>
        );
    };

    return (
        <LayoutPage header={loginHeader()} title={'Entrar'}>
                <Form onSubmit={handleLogin}
                    initialValues={initialValues}
                    validationSchema={signupSchema}>
                    <>
                        <Form.Header>
                            <h3>Bem-vindo de volta!</h3>
                        </Form.Header>
                        <Form.Content>
                            <>
                                <TextField name="email" label="Digite seu e-mail" type="email *" placeholder="example@site.com"/>
                                <TextField name="password" label="Senha" type="password" placeholder="*****"/>
                                <Link to="/login/forgot" className="link btn-link">Esqueceu a senha?</Link>
                            </>
                        </Form.Content>
                        <Form.Footer>
                            <button type="submit" className="link btn btn-primary">Entrar</button>
                        </Form.Footer>
                    </>
                </Form>
        </LayoutPage>
    );
};

const initialValues: FormData = {
    email: '',
    password: ''
};

type FormData = {
    email: string;
    password: string;
};

export default Login;