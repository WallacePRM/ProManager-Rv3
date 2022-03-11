import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../index.module.css';

const ModalHeader = (props: ModalHeaderProps) => {
    return (
        <div className={styles["modal-header"]}>
            {props.children}
            <FontAwesomeIcon onClick={props.onClose} className={styles["header-icon"]} icon={faXmark}/>
        </div>
    );
};

type ModalHeaderProps = {
    children: React.ReactElement;
    onClose: () => void;
};

export default ModalHeader;