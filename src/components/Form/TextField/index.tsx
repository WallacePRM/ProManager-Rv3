import { useField } from "formik";

const TextField = ({ label, ...props }: TextFieldProps) => {

    const [field, meta, helpers] = useField(props);
    return (
        <div className="form-field">
            <label>{label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error && (
                <div className="form-error">{meta.error}</div>
            )}
        </div>
    );
};

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type TextFieldProps =  Omit<InputProps, 'name'> & {
    label: string;
    name: string;
}

export default TextField;