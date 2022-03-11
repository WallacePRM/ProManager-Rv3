import { authAxios as api } from './base';

export const postTask = async (data: PostTaskData): Promise<Task> => {

    const response = await api.post(`/tasks/${data.project_id}`, data);
    return response.data as Task;
};

type PostTaskData = {
    name: string;
    project_id: number;
};

export type Task = {
    id: number;
    name: string;
    history: Array<History>;
    isDone: boolean;
};

export type History = {
    id: number,
    action: string,
    date: string
}