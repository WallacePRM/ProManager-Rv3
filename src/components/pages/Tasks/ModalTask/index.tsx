import Form from "../../../Form";
import Modal from "../../../Modal";
import { object, string } from 'yup';
import ModalContent from "../../../Modal/ModalContent";
import ModalHeader from "../../../Modal/ModalHeader";
import TextField from "../../../Form/TextField";
import { postTask, Task } from "../../../../services/api/tasks-service";
import { useParams } from "react-router-dom";

const ModalTask = (props: ModalTaskProps) => {

    const params = useParams();

    const initialValues = {
        name: ''
    };
    const taskSchema = object().shape({
        name: string().required().max(50)
    });

    const handleCreateTask = async (values: typeof initialValues) => {

        const projectId = parseInt(params.id || '');

        try {
            const taskValues = {
                name: values.name,
                project_id: projectId
            };

            const result = await postTask(taskValues);
            const task: Task = {
                id: result.id,
                isDone: false,
                history: [],
                ...values
            };

            props.onTaskCreated(task);
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
                    <h1>Crie sua tarefa</h1>
                </ModalHeader>
                <ModalContent>
                    <Form initialValues={initialValues}
                    validationSchema={taskSchema}
                    onSubmit={handleCreateTask}>
                        <>
                            <Form.Content>
                                <>
                                    <TextField name="name" label="Nome da tarefa"/>
                                </>
                            </Form.Content>
                            <Form.Footer>
                                <button className='btn btn-primary'>Criar tarefa</button>
                            </Form.Footer>
                        </>
                    </Form>
                </ModalContent>
            </>
        </Modal>
    );
};

type ModalTaskProps = {
    onClose: () => void;
    onTaskCreated: (task: Task) => void;
};

export default ModalTask;