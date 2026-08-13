import api from "./axios";

export const getTasks = async (params) => {
    return api.get("/tasks", { params });
};

export const getTask = async (id) => {
    return api.get(`/tasks/${id}`);
};

export const createTask = async (taskData) => {
    return api.post("/tasks", taskData);
};

export const updateTask = async (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
};

export const deleteTask = async (id) => {
    return api.delete(`/tasks/${id}`);
};

