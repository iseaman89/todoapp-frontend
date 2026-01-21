import axios from 'axios';
import { useAuth } from '../auth/useAuth';

export const useToDoApi = () => {
    const { authData } = useAuth();
    
    const toDoApi = axios.create({
        baseURL: 'https://localhost:7095/api/ToDo',
        
    });
    
    toDoApi.interceptors.request.use(config => {
        if (authData?.accessToken) {
            config.headers['Authorization'] = `Bearer ${authData.accessToken}`;
        }
        return config;
    });
    
    const getToDos = async () => {
        const res = await toDoApi.get();
        return res.data;
    };

    const getToDo = async (id) => {
        const res = await toDoApi.get(`/${id}`);
        return res.data;
    };

    const createToDo = async (data) => {
        const res = await toDoApi.post('/', data);
        return res.data;
    };

    const updateToDo = async (data) => {
        const res = await toDoApi.put('/', data);
        return res.data;
    };

    const deleteToDo = async (id) => {
        const res = await toDoApi.delete(`/${id}`);
        return res.data;
    };

    return { getToDos, getToDo, createToDo, updateToDo, deleteToDo };
};