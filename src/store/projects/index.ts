import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../services/api/projects-service";
import { Task } from "../../services/api/tasks-service";
import { RootState } from "../store";

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [] as Array<Project>,
        currentProjects: [] as Array<Project>
    },
    reducers: {
        loadedProjects: (state, action: PayloadAction<Array<Project>>) => {
            state.projects = action.payload;
        },
        updateCurrentProjects: (state, action: PayloadAction<Array<Project>>) => {
            state.currentProjects = action.payload;
        },
        createProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        createTask: (state, action: PayloadAction<CreateTaskData>) => {
            const index = state.projects.findIndex(p => p.id === action.payload.project_id);
            state.projects[index].tasks.push(action.payload.task);
        },
        updateTask: (state, action: PayloadAction<UpdateTaskData>) => {
            const index = state.projects.findIndex(p => p.id === action.payload.project_id);
            const taskIndex = state.projects[index].tasks.findIndex(t => t.id === action.payload.task.id);
            state.projects[index].tasks[taskIndex] = action.payload.task;
        }
    }
});

type CreateTaskData = {
    task: Task;
    project_id: number;
};

type UpdateTaskData = {
    task: Task;
    project_id: number;
};

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectCurrentProjects = (state: RootState) => state.projects.currentProjects;
export const { loadedProjects, updateCurrentProjects, createProject, createTask, updateTask } = projectsSlice.actions;
export default projectsSlice.reducer;