import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import styles from './index.module.css';

const EmptyMessage = (props: EmptyMessageProps) => {
    return (
        <div className={styles['empty-message-container']}>
            <div className={styles['empty-message']}>
                <FontAwesomeIcon className={styles['empty-message-icon']} icon={props.icon || faInbox}/>
                <h3>{props.title || ''}</h3>
                <p>{props.message}</p>
            </div>
        </div>
    );
};

type EmptyMessageProps = {
    icon?: any;
    title?: string;
    message: string;
};

export default EmptyMessage;