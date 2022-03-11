import styles from './index.module.css';

const Modal = (props: ModalProps) => {



    return (
        <div className={styles["background-modal"]}>
            <div className={styles.modal + ' card-template'}>
               {props.children}
            </div>
        </div>
    );
};

type ModalProps = {
    children: React.ReactElement;
};

export default Modal;