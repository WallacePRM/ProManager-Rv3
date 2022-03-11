import { authAxios as api } from "./base";

export const postHistory = async (data: PostHistoryData):  Promise<void> => {

    const { task_id, project_id, ...history} = data;
    const response = await api.post('/history/' + data.project_id + '/' + data.task_id, history);
    return response.data;
};

type PostHistoryData = {
    action: string;
    date: string;
    task_id: number;
    project_id: number;
};
