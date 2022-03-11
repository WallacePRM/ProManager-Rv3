import { faEllipsis, faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutApp from "../../layouts/LayoutApp";
import Task from "./Task";
import './index.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask, selectProjects, updateTask } from "../../../store/projects";
import ErrorMessage from "../../ErrorMessage";
import { useState } from "react";
import ModalTask from "./ModalTask";
import { Task  as TaskItem} from "../../../services/api/tasks-service";
import { postHistory } from "../../../services/api/history-service";
import { useDrop } from "react-dnd";

const Tasks = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const projectId = parseInt(params.id || '');
    const projects = useSelector(selectProjects);
    const project = projects.find(p => p.id === projectId);
    if (!project) {
        return <LayoutApp>
            <ErrorMessage message="Projeto inexistente"/>
        </LayoutApp>
    }

    const newTasks = project.tasks.filter(t => t.history.length === 0 || t.history[t.history.length - 1].action === 'pause');
    const inProgress =  project.tasks.filter(t => t.history[t.history.length - 1]?.action === 'play');
    const completed =  project.tasks.filter(t => t.isDone);
    const [ modalVisible , setModalVisible] = useState(false);

    const handleBackClick = () => {
        navigate('/projects');
    };

    const handleCloseModal = () => {

        setModalVisible(false);
    };

    const handleShowModalTask = () => {

        setModalVisible(true);
    };

    const handleTaskCreated = (task: TaskItem) => {

        dispatch(createTask({task, project_id: projectId}));
    };

    const getDrop = (isDone: boolean, action: string) => {

        return async (item: TaskItem, monitor: any) => {

            const task = project.tasks.find(t => t.id === item.id);
            if (task) {

                const history =  {
                    id: 0,
                    action: action,
                    date: new Date().toISOString()
                };
                const taskChanged = {
                    ...task,
                    isDone: isDone,
                    history: [
                        ...task.history,
                        history
                    ]
                };

                dispatch(updateTask({
                    project_id: projectId,
                    task: taskChanged
                }))

                try {
                    await postHistory({
                        ...history,
                        task_id: taskChanged.id,
                        project_id: projectId
                    });
                }
                catch(error) {
                    console.error(error);
                    console.log(task);
                    dispatch(updateTask({
                        project_id: projectId,
                        task: task
                    }));

                    alert('Falha ao mover tarefa');
                }
            }
        }
    }

    const [{ canDrop: canDrop1, isOver: isOver1 }, drop1] = useDrop<any, any, any>(() => ({
        accept: 'DragBoxItem',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop: getDrop(false, 'pause')
    }));

    const [{ canDrop: canDrop2, isOver: isOver2 }, drop2] = useDrop<any, any, any>(() => ({
        accept: 'DragBoxItem',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: getDrop(false, 'play')
    }));

    const [{ canDrop: canDrop3, isOver: isOver3 }, drop3] = useDrop<any, any, any>(() => ({
        accept: 'DragBoxItem',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop: getDrop(true, 'stop')
    }));

    const setTaskStatus = () => {};

    return (
        <LayoutApp>
            <>
                <LayoutApp.Header onBtnPlusClick={handleShowModalTask} onBackClick={handleBackClick} title={project.name}/>
                <LayoutApp.Content>
                    <div className="tasks-container">
                        <div className='tasks-overlay grid-template'>
                            <div className="tasks new-tasks">
                                <div className="tasks-list-title">
                                    <div className="tasks-list-info">
                                        <span className="tasks-list-count">{newTasks.length}</span>
                                        <h1>Novas</h1>
                                    </div>
                                    <div className="tasks-list-actions">
                                        <div className="tasks-list-actions-item">
                                            <FontAwesomeIcon icon={faEllipsis}/>
                                        </div>
                                    </div>
                                </div>
                                <ul ref={drop1} role={'Dustbin'} className="tasks-list">
                                    {newTasks.map((t) => <Task key={t.id} task={t}/>)}
                                </ul>
                            </div>
                            <div className="tasks tasks-in-progress">
                                <div className="tasks-list-title">
                                    <div className="tasks-list-info">
                                        <span className="tasks-list-count">{inProgress.length}</span>
                                        <h1>Em progresso</h1>
                                    </div>
                                    <div className="tasks-list-actions">
                                        <div className="tasks-list-actions-item">
                                            <FontAwesomeIcon icon={faEllipsis}/>
                                        </div>
                                    </div>
                                </div>
                                <ul ref={drop2} role={'Dustbin'} className="tasks-list">
                                    {inProgress.map((t) => <Task key={t.id} task={t}/>)}
                                </ul>
                            </div>
                            <div className="tasks completed-tasks">
                                <div className="tasks-list-title">
                                    <div className="tasks-list-info">
                                        <span className="tasks-list-count">{completed.length}</span>
                                        <h1>Concluídas</h1>
                                    </div>
                                    <div className="tasks-list-actions">
                                        <div className="tasks-list-actions-item">
                                            <FontAwesomeIcon icon={faEllipsis}/>
                                        </div>
                                    </div>
                                </div>
                                <ul ref={drop3} role={'Dustbin'} className="tasks-list">
                                    {completed.map((t) => <Task key={t.id} task={t}/>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </LayoutApp.Content>

                { modalVisible ? <ModalTask onTaskCreated={handleTaskCreated} onClose={handleCloseModal}/> : null}
            </>
        </LayoutApp>
    );
};

export default Tasks;
