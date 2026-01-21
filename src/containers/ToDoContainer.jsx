import React, { useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useToDoApi } from '../api/toDoApi.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateToDo from "../components/todo/CreateToDo.jsx";
import SearchToDo from "../components/todo/SearchToDo.jsx";
import ToDo from "../components/todo/ToDo.jsx";
import NoToDo from "../components/todo/NoToDo.jsx";
import Progress from "../components/todo/Progress.jsx";

const ToDoContainer = () => {
    const { getToDos, deleteToDo, createToDo, updateToDo } = useToDoApi();
    const [toDos, setToDos] = useState([]);
    const [currentToDos, setCurrentToDos] = useState([]);
    const debouncedServerUpdateRef = useRef(null);
    const completedCount = toDos.filter(todo => todo.isCompleted).length;
    const totalCount = toDos.length;
    const userString = localStorage.getItem('user');

    let userName = null;
    if (userString) {
        const user = JSON.parse(userString);
        userName = user.name;
    }
    
    useEffect(() => {
        const fetchToDos = async () => {
            try {
                const data = await getToDos();
                setToDos(data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load toDos.');
            }
        };

        fetchToDos();
    }, []);

    useEffect(() => {
        debouncedServerUpdateRef.current = debounce(async (data) => {
            try {
                await updateToDo(data);
            } catch (err) {
                console.error(err);
                toast.error('Sync failed.');
            }
        }, 1000);

        return () => {
            debouncedServerUpdateRef.current?.cancel();
        };
    }, [updateToDo]);

    const debouncedServerUpdate = debouncedServerUpdateRef.current;

    useEffect(() => {
        return () => {
            debouncedServerUpdateRef.current?.cancel();
        };
    }, []);

    const handleCreate = async (data) => {
        try {
            const response = await createToDo(data);
            const newTodo = response.data || data;

            setToDos(prev => {
                return [...prev, newTodo];
            });
            
            setCurrentToDos(toDos);

            toast.success('ToDo created!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to create todo.');
        }
    }
    
    const handleUpdate = async (data) => {
        try {
            await updateToDo(data);
            toast.success("ToDo updated!");
        } catch (err) {
            console.error(err);
            toast.error('Failed to update todo.');
        }
    }
    
    const handleDelete = async (id) => {
        try {
            await deleteToDo(id);
            setToDos(prev => prev.filter(todo => todo.id !== id));
            toast.success('ToDo deleted!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete todo.');
        }
    };

    return (
        <div className="p-4 gap-4 w-3/4 max-w-3xl flex flex-col items-center justify-center">
            <h1
                className="text-5xl font-bold bg-clip-text text-transparent animate-gradient"
                style={{ 
                    backgroundImage: 'var(--color-progress)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                ToDo or not ToDo
            </h1>
            <h2
                className="text-2xl font-bold bg-clip-text text-transparent animate-gradient"
                style={{ 
                    backgroundImage: 'var(--color-progress)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                {"Welcome back " + userName}
            </h2>
            <h3 className="text-lg text-text-sub">
                Stay organized and productive
            </h3>
            <div className="flex items-center justify-center gap-3">
                <h4 className="text-md text-text-sub">
                    {completedCount + " completed"}
                </h4>
                <h4 className="text-md text-text-sub">
                    •
                </h4>
                <h4 className="text-md text-text-sub">
                    {totalCount + " total tasks"}
                </h4>
            </div>
            <CreateToDo createToDo={handleCreate} />
            <SearchToDo 
                toDos={toDos} 
                setCurrentToDos={setCurrentToDos}
            />
            {currentToDos.length > 0 ? (
                currentToDos.map((toDo) => (
                    <ToDo
                        key={toDo.id}
                        toDo={toDo}
                        updateToDo={handleUpdate}
                        deleteToDo={handleDelete}
                        setToDos={setToDos}
                        debouncedServerUpdate={debouncedServerUpdate}
                    />
                ))
            ) : (
                <NoToDo />
            )}
            <Progress toDos={toDos} />
            <ToastContainer 
                position="top-right"
                autoClose={3000}
            />
        </div>
    );
};

export default ToDoContainer;