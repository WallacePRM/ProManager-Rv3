import { faCheckCircle as farCheckCircle, faComment } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faShareNodes, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userLogo from '../../../../assets/img/default-user-image.png';

import './index.css';
import { Task as TaskItem } from "../../../../services/api/tasks-service";
import { useDrag } from "react-dnd";

const style = {
    labels: [{
        background: 'rgba(var(--red-color), .9)'
    }],
    priority: {
        background: 'rgba(var(--yellow-color), .9)'
    },
    subtaskDone: {
        iconColor: {
            color: 'rgba(var(--blue-marine-color), .9)'
        },
        textColor: {
            color: 'var(--text-smooth)'
        }
    }
};

const Task = ({ task }: TaskProps) => {

    const [{ isDragging }, drag, dragPreview]: any = useDrag(() => ({
        type: 'DragBoxItem',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }))

    return  (
        <li ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
            <div role="Handle" ref={drag} className="tasks-item card-template">
                {/* <div className="task-img">
                    <img src={taskBackground}/>
                </div> */}
                <div className='task-priority'>
                    {/* {task.priority ? <div className='task-priority-item' style={style.priority}></div> : null} */}
                </div>
                <div className='task-header'>
                    <FontAwesomeIcon style={{color: task.isDone ? 'rgba(var(--accent-color))' : ''}} className="task-header-icon" icon={farCheckCircle}/>
                    <h3>{task.name}</h3>
                </div>
                <div className='task-content'>
                    <div className="task-labels">
                        {/* {task.label ? <label className="task-label" style={{background: task.label.color}}>{task.label.name}</label> : null} */}
                    </div>
                    <div className="task-integral">
                        <div className="task-integral-info">
                            <img className="img-circle" src={userLogo}/>
                            <span>Username</span>
                        </div>
                        {/* <div className="task-integral-tools">
                            <div className="task-tools-item">
                                <span className="task-tools-count">2</span>
                                <FontAwesomeIcon icon={faComment}/>
                            </div>
                            <div className="task-tools-item">
                                <span className="task-tools-count">0</span>
                                <FontAwesomeIcon icon={faShareNodes}/>
                            </div>
                        </div> */}
                    </div>
                    {/* <ul className="subtasks-list">
                        <li className="subtask-item">
                            <FontAwesomeIcon className="subtask-icon" icon={farCheckCircle}/>
                            <span className="subtask-name">Initial design review</span>
                        </li>
                        <li className="subtask-item">
                            <FontAwesomeIcon className="subtask-icon" icon={faCheckCircle} style={style.subtaskDone.iconColor}/>
                            <span style={style.subtaskDone.textColor} className="subtask-name">Approved budget</span>
                        </li>
                        <li className="subtask-item new-subtask">
                            <FontAwesomeIcon className="subtask-icon" icon={faPlus}/>
                            <input className="subtask-name" placeholder="Adicionar subtarefa"/>
                        </li>
                    </ul> */}
                </div>
            </div>
        </li>
    )
};

export type TaskProps = {
    task: TaskItem;
};

export default Task;