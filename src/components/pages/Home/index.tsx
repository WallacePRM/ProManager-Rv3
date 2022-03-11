import { Link } from "react-router-dom";
import logo from '../../../assets/img/logo-black.png';
import styles from './index.module.css';

const Home = () => {

    document.title = 'ProManager-Rv3 - Gerenciador de projetos';

    return (
        <div className={styles.app}>
            <div className={styles.main}>
                <header className={styles['app-header']}>
                    <Link to="/" className={styles['app-header-logo']}>
                        <img src={logo}/>
                        <h1>ProManager-Rv3</h1>
                    </Link>
                    <div className={styles['app-header-tools']}>
                        <span>Ja possui uma conta?</span>
                        <Link to="/login" className="link btn btn-primary">Entrar</Link>
                    </div>
                </header>
                <div className={styles['app-container']}>
                    <div className={styles['main-section']}>
                        <div className={styles['app-section']}>
                            <h1>A melhor maneira de controlar e organizar seus projetos</h1>
                            <p>Junte-se a nós e faça parte desta comunidade</p>
                            <Link to="/signup" className="link btn btn-primary">Começar agora</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;