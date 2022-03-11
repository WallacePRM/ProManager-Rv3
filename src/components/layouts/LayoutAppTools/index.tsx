import { faArrowDownWideShort, faEllipsis, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

const LayoutAppTools = () => {
    return (
        <div className="app-tools">
            <div className="app-tools-info">
                <span>2 projetos finalizados hoje</span>
            </div>
            <ul className="app-tools-actions">
                <li className="tools-actions-item">
                    <FontAwesomeIcon icon={faArrowDownWideShort} />
                    <label>Filtrar</label>
                </li>
                <li className="tools-actions-item">
                    <FontAwesomeIcon icon={faSort} />
                    <label>Organizar</label>
                </li>
                <li className="tools-actions-item separator"></li>
                <li className="tools-actions-item">
                    <FontAwesomeIcon icon={faEllipsis} />
                </li>
            </ul>
        </div>
    );
};

export default LayoutAppTools;