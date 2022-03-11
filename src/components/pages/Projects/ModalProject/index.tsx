import Form from "../../../Form";
import Modal from "../../../Modal";
import { number, object, string } from 'yup';
import ModalContent from "../../../Modal/ModalContent";
import ModalHeader from "../../../Modal/ModalHeader";
import TextField from "../../../Form/TextField";
import { postProject, Project } from "../../../../services/api/projects-service";
import { createProject } from "../../../../store/projects";
import { useDispatch } from "react-redux";

const ModalProject = (props: ModalProjectProps) => {

    const dispath = useDispatch();

    const initialValues = {
        name: '',
        description: '',
        estimated_time: '',
        price: 0
    };
    const projectSchema = object().shape({
        name: string().required().max(50),
        description: string().max(100),
        estimated_time: string().max(10),
        price: number().moreThan(-1)
    });

    const handleCreateProject = async (values: typeof initialValues) => {

        try {
            const result = await postProject(values);
            const project: Project = {
                id: result.id,
                tasks: [],
                ...values
            };

            dispath(createProject(project));
            props.onProjectCreated(project);
            props.onClose();
        }
        catch(error) {
            console.error(error);
            alert('Falha ao criar projeto');
        }
    };

    return (
        <Modal>
            <>
                <ModalHeader onClose={props.onClose}>
                    <h1>Crie seu projeto</h1>
                </ModalHeader>
                <ModalContent>
                    <Form initialValues={initialValues}
                    validationSchema={projectSchema}
                    onSubmit={handleCreateProject}>
                        <>
                            <Form.Content>
                                <>
                                    <TextField name="name" label="Nome do projeto"/>
                                    <TextField name="description" label="Descrição"/>
                                    <TextField name="estimated_time" label="Tempo estimado" placeholder="HH:MM"/>
                                    <TextField name="price" label="Preço" placeholder="0" type="number"/>
                                </>
                            </Form.Content>
                            <Form.Footer>
                                <button className='btn btn-primary'>Criar projeto</button>
                            </Form.Footer>
                        </>
                    </Form>
                </ModalContent>
            </>
        </Modal>
    );
};

type ModalProjectProps = {
    onClose: () => void;
    onProjectCreated: (project: Project) => void;
};

export default ModalProject;