import { authAxios as api } from "./base";
import { Task } from "./tasks-service";

// GET
export const getProjects = async (id: number | null = null): Promise<Array<Project>> => {

    const response = await api.get('/projects' + (id ? '/id=' + id : ''));
    return response.data as Array<Project>;
};

export type Project = {
    id: number;
    name: string;
    description: string;
    estimated_time: string;
    price: number;
    tasks: Array<Task>;
};

// POST
export const postProject = async (data: PostProjectData): Promise<PostProjectResponse> => {

    const response = await api.post('/projects', data);
    return response.data as PostProjectResponse;
};

type PostProjectData = {
    name: string;
    description: string;
    estimated_time: string;
    price: number;
}
type PostProjectResponse = {
    id: number;
}

// DELETE
export const deleteProject = async (id: number): Promise<void> => {

    await api.delete('/projects/id=' + id);
};