import './index.css';
import LayoutApp, { TabItem, Tabs } from "../../layouts/LayoutApp";
import Project from './Project';
import EmptyMessage from '../../EmptyMessage';
import { getProjects, Project as ProjectItem } from '../../../services/api/projects-service';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadedProjects, selectCurrentProjects, selectProjects, updateCurrentProjects } from '../../../store/projects';
import { useNavigate } from 'react-router-dom';
import { getLocalToken } from '../../../services/token';
import ModalProject from './ModalProject';

const Projects = () => {

    const navigate = useNavigate();

    const projects = useSelector(selectProjects);
    const currentProjects = useSelector(selectCurrentProjects);
    const [ modalVisible , setModalVisible] = useState(false);
    const [ activeTab , setActiveTab ] = useState(Tabs.All);

    const dispatch = useDispatch();
    useEffect(() => {

        const isLogged = getLocalToken() !== null;
        if (!isLogged) {
            navigate('/login');
            return;
        }

        const loadProjects = async () => {
            try {
                const result = await getProjects();
                dispatch(loadedProjects(result));
                dispatch(updateCurrentProjects(result));
            }
            catch(error) {
                console.error(error);
                alert('Falha ao baixar projetos');
            }
        };

        loadProjects();
    }, []);

    const getInProgressProjects = () => {

        return  projects.filter(p => p.tasks.length === 0 || p.tasks.some(t => !t.isDone));
    };

    const getCompletedProjects = () => {

        return projects.filter(p => p.tasks.length > 0 && p.tasks.filter(t => !t.isDone).length === 0);
    };

    // Handle
    const handletabChange = (activeTab: TabItem) => {

        setActiveTab(activeTab.id);
        if (activeTab.id === Tabs.All) {

            dispatch(updateCurrentProjects(projects));
        }
        else if (activeTab.id === Tabs.InProgress) {

            const currentProjects = getInProgressProjects();
            dispatch(updateCurrentProjects(currentProjects));
        }
        else if (activeTab.id === Tabs.Completed) {

            const currentProjects = getCompletedProjects();
            dispatch(updateCurrentProjects(currentProjects));
        }
    };

    const tabs: Array<TabItem> = [{
            id: Tabs.All,
            label: 'Todos',
            count: projects.length
        },
        {
            id: Tabs.InProgress,
            label: 'Em progresso',
            count: getInProgressProjects().length
        },
        {
            id: Tabs.Completed,
            label: 'Completados',
            count: getCompletedProjects().length
        }
    ];

    const handleProjectSelected = (project: ProjectItem) => {

        navigate(`/projects/${project.id}`);
    };

    const handleShowModalProject = () => {

        setModalVisible(true);
    };

    const handleCloseModal = () => {

        setModalVisible(false);
    };

    const handleProjectCreated = (project: ProjectItem) => {

        if (activeTab === Tabs.All) {
            const projects = [...currentProjects, project];
            dispatch(updateCurrentProjects(projects));
        }
    };

    return (
        <LayoutApp>
            <>
                <LayoutApp.Header onBtnPlusClick={handleShowModalProject} title="ProManager-Rv3" tabs={<LayoutApp.HeaderTabs initialTab={Tabs.All} tabs={tabs} onTabChange={handletabChange}/>}/>
                <LayoutApp.Content>
                    <div className='projects-container'>
                        {currentProjects.length === 0 ? <EmptyMessage
                            title="Nenhum projeto encontrado"
                            message="Adicione novos projetos clicando no ícone (+) no canto supeior direito do site"/>
                        :
                        <div className='projects-overlay'>
                            <ul className="projects-list grid-template">
                                {currentProjects.map((p) =><Project onSelected={handleProjectSelected} key={p.id} project={p}/>)}
                            </ul>
                        </div>
                        }
                    </div>
                </LayoutApp.Content>

                { modalVisible ? <ModalProject onProjectCreated={handleProjectCreated} onClose={handleCloseModal}/> : null}
            </>
        </LayoutApp>
    );
};

export default Projects;