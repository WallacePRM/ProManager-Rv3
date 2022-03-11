import React from 'react';
import { Formik, Form as FormFormik } from 'formik';
import * as Yup from 'yup';
import './index.css';

const Form = (props: FormProps) => {


    return (
        <Formik initialValues={props.initialValues}
            onSubmit={props.onSubmit}
            validationSchema={props.validationSchema}>
            <FormFormik  className="form-app">
                {props.children}
            </FormFormik>
        </Formik>
    );
};

Form.Header = (props: {children: React.ReactElement}) => {
    return (
        <div className="form-app-header">
            {props.children}
        </div>
    );
};

Form.Content = (props: {children: React.ReactElement}) => {
    return (
        <div className="form-app-content">
            {props.children}
        </div>
    );
};

Form.Footer = (props: {children: React.ReactElement}) => {
    return (
        <div className="form-app-footer">
            {props.children}
        </div>
    );
};

type FormProps = {
    children: React.ReactElement;
    initialValues: Object;
    validationSchema: Yup.ObjectSchema<any>;
    onSubmit: (formData: any) => void | Promise<void>;
}

export default Form;