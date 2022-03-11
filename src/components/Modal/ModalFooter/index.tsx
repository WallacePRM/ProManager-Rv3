import styles from '../index.module.css';

const ModalFooter = (props: {children: React.ReactElement}) => {
    return (
        <div className={styles["modal-footer"]}>
            {props.children}
        </div>
    );
};

export default ModalFooter;