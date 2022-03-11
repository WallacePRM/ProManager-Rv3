import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calcTimeProject, formatTime } from "../../../../common/project-time-utlis";
import { Project as ProjectItem } from "../../../../services/api/projects-service";
import './index.css';

const Project = (props: ProjectProps) => {

    const { project } = props;
    const style = {
        item1: {
            background: 'rgba(var(--blue-color))'
        },
        item2: {
            background: 'rgba(var(--light-blue-color))'
        },
        item3: {
            background: 'rgba(var(--yellow-color), 1)'
        },
        item4: {
            background: 'rgba(var(--light-purple-color))'
        },
        priority: {
            background: 'rgba(var(--red-color), .9)'
        },
        progress: {
            width: '0%'
        }
    };

    if (project.tasks.length > 0) {
        const tasksDone = project.tasks.filter(task => task.isDone);
        style.progress.width = (tasksDone.length / project.tasks.length * 100) + '%';
    }

    const handleHeaderClick = () => {

        props.onSelected(project);
    };

    const projectTime = formatTime(calcTimeProject(project));

    return (
        <li className="projects-item card-template">
            <div className='project-priority'>
                {/* <div className='project-priority-item' style={style.priority}></div> */}
            </div>
            <header onClick={handleHeaderClick} className='project-header'>
                <div className='project-header-title'>
                    <h3>{project.name}</h3>
                </div>
                <span style={{opacity: project.description ? '1' : '0'}}>{project.description || 'Sem descrição'}</span>
            </header>
            <div className='project-content'>
                <ul className='project-progress-list'>
                    <li className='project-progress-list-item'>
                        <div className='project-progress-item-circle' style={style.item2}></div>
                        <label>1 Integrantes</label>
                    </li>
                    <li className='project-progress-list-item'>
                        <div className='project-progress-item-circle' style={style.item3}></div>
                        <label>{project.tasks.length} Tarefas</label>
                    </li>
                    <li className='project-progress-list-item'>
                        <div className='project-progress-item-circle' style={style.item1}></div>
                        <label title="Tempo decorrido/Tempo estimado">{project.estimated_time ?  projectTime + ' / ' + project.estimated_time : 'Sem tempo estimado'}</label>
                    </li>
                    <li className='project-progress-list-item'>
                        <div className='project-progress-item-circle' style={style.item4}></div>
                        <label>{project.price > 0 ? 'R$ ' + project.price : 'Sem valor'}</label>
                    </li>
                </ul>
                <div className='project-progress'><div className='project-progress-bar' style={style.progress}></div></div>
            </div>
            {/* <footer className='project-footer'>
                <div className='icon-circle'>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </footer> */}
        </li>
    )
};

export type ProjectProps = {
    project: ProjectItem;
    onSelected: (project: ProjectItem) => void;
};

export default Project;