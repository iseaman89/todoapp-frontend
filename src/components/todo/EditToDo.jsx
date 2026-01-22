import React from 'react';
import OkIcon from "../../assets/icon/ok.png";
import CancelIcon from "../../assets/icon/cancel.png";
import PropTypes from "prop-types";

const EditToDo = ({toDo, setToDos, updateToDo, setEdit}) => {
    const [editText, setEditText] = React.useState(toDo.title);
    
    const handleUpdate = () => {
        if (editText === toDo.title) {
            setEdit(false);
            return;
        } 
        const updatedTodo = { ...toDo, title: editText };
        setToDos(prev => prev.map(t => t.id === toDo.id ? updatedTodo : t));
        updateToDo(updatedTodo);
        setEdit(false);
    }
    
    const handleCancel = () => {
        setEdit(false);
    }
    
    return (
        <div className="flex flex-1 items-center">
            <div className="flex flex-col justify-between gap-2 w-full">
                <input
                    className="input rounded-lg w-full px-3 py-1 text-sm border border-border"
                    placeholder="Add new title..."
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
                
            </div>
            <div className="flex items-end justify-end gap-2 px-2">
                <button 
                    className="flex items-center justify-center p-2 rounded-lg bg-black border border-black hover:cursor-pointer"
                    onClick={handleUpdate}
                >
                    <img 
                        src={OkIcon} 
                        alt="Edit todo" 
                        className="w-6 h-3 hover:cursor-pointer"
                    />
                </button>
                <button 
                    className="flex items-center justify-center p-2 rounded-lg bg-white border border-border hover:cursor-pointer" 
                    onClick={handleCancel}
                >
                    <img 
                        src={CancelIcon} 
                        alt="Delete todo"
                        className="w-6 h-3 hover:cursor-pointer" 
                    />
                </button>
            </div>
        </div>
    );
};

EditToDo.propTypes = {
    toDo: PropTypes.object.isRequired,
    setToDos: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired,
    setEdit: PropTypes.func.isRequired
}

export default EditToDo;