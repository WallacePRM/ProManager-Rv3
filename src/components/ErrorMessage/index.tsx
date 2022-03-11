import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './index.module.css';

const ErrorMessage = (props: ErrorMessageProps) => {
    return (
        <div className={styles['error-message-container']}>
            <div className={styles['error-message']}>
                <FontAwesomeIcon className={styles['error-message-icon']} icon={faTimesCircle}/>
                <h3>{props.title || ''}</h3>
                <p>{props.message}</p>
            </div>
        </div>
    );
};

type ErrorMessageProps = {
    title?: string;
    message: string;
};

export default ErrorMessage;