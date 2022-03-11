import styles from '../index.module.css';

const ModalContent = (props: {children: React.ReactElement}) => {
    return (
        <div className={styles["modal-content"]}>
            {props.children}
        </div>
    );
};

export default ModalContent;