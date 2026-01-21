import React, {useState} from 'react';
import PropTypes from "prop-types";
import EditIcon from '../../assets/icon/edit.svg';
import DeleteIcon from '../../assets/icon/delete.svg';
import EditToDo from "./EditToDo.jsx";

const CATEGORIES = [
    { id: 0, name: 'Personal' },
    { id: 1, name: 'Work' },
    { id: 2, name: 'Shopping' },
    { id: 3, name: 'Health' }
];

const PRIORITIES = [
    { id: 0, name: 'Low', border: 'border-priority-low-border', text: 'text-priority-low-text', container: 'bg-priority-low-container' },
    { id: 1, name: 'Medium', border: 'border-priority-medium-border', text: 'text-priority-medium-text', container: 'bg-priority-medium-container'  },
    { id: 2, name: 'High', border: 'border-priority-high-border', text: 'text-priority-high-text', container: 'bg-priority-high-container'  }
];

const ToDo = ({toDo, updateToDo, deleteToDo, debouncedServerUpdate, setToDos}) => {
    const [edit, setEdit] = useState(false);
    
   const handleDelete = () => {
       deleteToDo(toDo.id);
   }

    const handleCheck = () => {
        const updatedTodo = { ...toDo, isCompleted: !toDo.isCompleted };
        setToDos(prev => prev.map(t => t.id === toDo.id ? updatedTodo : t));
        debouncedServerUpdate(updatedTodo);
    }
    
    const handleUpdate = (updatedTodo) => {
        setToDos(prev => prev.map(t => t.id === toDo.id ? updatedTodo : t));
        updateToDo(updatedTodo);
    }
    
    return (
        <div className={`container flex items-center p-4 pb-6 gap-3 w-full rounded-lg border transition-all duration-300 
            ${toDo.isCompleted
            ? 'bg-gray-100/50 border-gray-200 opacity-75 grayscale-[0.5]'
            : 'bg-white border-gray-300'}`}
        >
            <input 
                className="custom-checkbox" 
                type="checkbox" 
                checked={toDo.isCompleted}
                onChange={handleCheck} 
            />
            {edit === true ? (
                <EditToDo 
                    toDo={toDo}
                    setToDos={setToDos} 
                    updateToDo={handleUpdate} 
                    setEdit={setEdit}
                />
            ) : (
                <div className="flex flex-1 items-center justify-between w-full">
                    <div className="flex flex-col justify-between gap-2 w-full">
                        <span className={`${toDo.isCompleted ? 'line-through decoration-text-line decoration-2 text-text-line' : ''}`}>
                            {toDo.title}
                        </span>
                        <div className="flex items-start justify-start gap-1">
                            <span className="text-xs py-0.5 px-2 rounded-md border border-border">
                                {CATEGORIES[toDo.category]?.name || "No category"}
                            </span>
                            <span className={`text-xs py-0.5 px-2 rounded-md border ${PRIORITIES[toDo.priority]?.border} 
                            ${PRIORITIES[toDo.priority]?.text} ${PRIORITIES[toDo.priority]?.container}`}
                            >
                                {PRIORITIES[toDo.priority]?.name || "No priority"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-end justify-end gap-2 px-2">
                        <img 
                            src={EditIcon} 
                            alt="Edit todo" 
                            className="w-4 h-4 hover:cursor-pointer" 
                            onClick={() => setEdit(true)}
                        />
                        <img
                            src={DeleteIcon} 
                            alt="Delete todo" 
                            className="w-4 h-4 hover:cursor-pointer" 
                            onClick={handleDelete} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

ToDo.propTypes = {
    toDo: PropTypes.object.isRequired,
    updateToDo: PropTypes.func.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    debouncedServerUpdate: PropTypes.func.isRequired,
    setToDos: PropTypes.func.isRequired
}

export default ToDo;