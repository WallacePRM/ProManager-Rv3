import * as Yup from 'yup';
import { Link } from "react-router-dom";
import LayoutPage from "../../layouts/LayoutPage";
import Form from "../../Form";
import TextField from '../../Form/TextField';
import { forgot } from '../../../services/api/auth-service';

const Forgot = () => {

    const handleForgot = async (formData: FormData) => {

        try {
            await forgot(formData);
            alert('Link enviado. Verifique seu e-mail');
        }
        catch(error) {
            console.error(error);
            alert('Falha ao enviar link');
        }
    };

    const forgotHeader = () => {
        return (
            <>
                <span>Ja possui uma conta?</span>
                <Link to="/signup" className="link btn btn-primary">Criar conta</Link>
            </>
        );
    };

    const signupSchema = Yup.object().shape({
        email: Yup.string()
        .max(50, 'Máximo de 50 caracteres')
        .required('Requerido')
    });

    return (
        <LayoutPage header={forgotHeader()} title={'Recuperar senha'}>
            <Form onSubmit={handleForgot}
            initialValues={initialValues}
            validationSchema={signupSchema}>
                <>
                <Form.Header>
                    <h3>Recuperar senha</h3>
                </Form.Header>
                <Form.Content>
                    <>
                        <TextField name="email" label="Digite seu e-mail" type="email *" placeholder="example@site.com"/>
                    </>
                </Form.Content>
                <Form.Footer>
                    <>
                        <button type="submit" className="btn btn-primary">Enviar link</button>
                        <Link to="/login" className="link btn btn-secundary btn-link">ou Entrar</Link>
                    </>
                </Form.Footer>
                </>
            </Form>
        </LayoutPage>
    );
};

const initialValues: FormData = {
    email: '',
};

type FormData = {
    email: string;
};

export default Forgot;