import React from "react";

import LoadPage from "../../LoadPage";
import { useAppSelector } from "../../../store/hooks";
import { selectLoadPage } from "../../../store/loadPage";
import logo from '../../../assets/img/logo-black.png';
import backgroundWave from '../../../assets/img/background-wave.svg';
import styles from './index.module.css';
import { Link } from "react-router-dom";

const LayoutPage = (props: LayoutPageProps) => {

    const loadPageVisible: boolean = useAppSelector(selectLoadPage);
    // // const dispatch = useAppDispatch();
    // dispatch(showLoadPage())

    document.title = props.title || 'ProManager-Rv3';
    return (
        <>
            {loadPageVisible ? <LoadPage /> : null}

            <div className={styles.app}>
                <div className={styles.section}>
                    <header className={styles['app-header']}>
                        <Link to="/" className={styles['app-header-logo']}>
                            <img src={logo} />
                            <h1>ProManager-Rv3</h1>
                        </Link>
                        <div className={styles['app-header-tools']}>
                            {props.header}
                        </div>
                    </header>
                    <div className={styles['app-container']}>
                        <div className={styles['app-container-center'] + ' card-template'}>
                            {props.children}
                        </div>
                    </div>
                </div>
                <img className={styles['background-app']} src={backgroundWave}/>
            </div>
        </>
    );
};

// TYPES
type LayoutPageProps = {
    title?: string;
    header?: React.ReactElement;
    children: React.ReactElement;
};

export default LayoutPage;