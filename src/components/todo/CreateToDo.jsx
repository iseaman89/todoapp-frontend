import React from 'react';
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import PlusIcon from "../../assets/icon/plus.svg";

const CreateToDo = ({createToDo}) => {
    const [title, setTitle] = React.useState("");
    const [priority, setPriority] = React.useState(1);
    const [category, setCategory] = React.useState(0);
    const [activeButton, setActiveButton] = React.useState(false);
    const isCompleted = false;
    
    const handleCreate = () => {
        if (!activeButton) return;
        if (title.trim().length > 200) {
            toast.error("Title can't be more than 200 characters!");
            return;
        }
        createToDo({ title, isCompleted, priority, category });
        setTitle("");
        setPriority(1);
        setCategory(0);
        setActiveButton(false);
    }
    
    const changeTitle = (title) => {
        setTitle(title);
        if (title.length > 0) setActiveButton(true);
        else setActiveButton(false);
    }
    
    return (
        <div className="container flex flex-col items-start justify-center w-full gap-3 p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between gap-5 w-full">
                <input 
                    className="input text-sm w-full rounded-lg px-4 py-2" 
                    placeholder="Add a new task..." 
                    value={title} 
                    onChange={(e) => changeTitle(e.target.value)}
                />
                <button 
                    className={`flex items-center justify-center gap-5 px-4 py-2 rounded-lg ${activeButton ? 'bg-black' : 'bg-button-inactive'}`} 
                    onClick={handleCreate}
                >
                    <img 
                        src={PlusIcon} 
                        alt="plus-icon"
                        className="w-4 h-4" 
                    />
                    <span className="text-white text-sm">
                        Add
                    </span>
                </button>
            </div>
            <div className="flex items-start justify-start gap-5">
                <div className="flex items-center justify-start gap-1">
                    <label 
                        htmlFor="category"
                        className="text-sm"
                    >
                        Category:
                    </label>
                    <select 
                        className="border border-border rounded-md p-1 text-sm" 
                        id="category" 
                        value={category} 
                        onChange={(e) => {setCategory(Number(e.target.value))}}
                    >
                        <option value={0}>
                            Personal
                        </option>
                        <option value={1}>
                            Work
                        </option>
                        <option value={2}>
                            Shopping
                        </option>
                        <option value={3}>
                            Health
                        </option>
                    </select>
                </div>
                <div className="flex items-center justify-start gap-1">
                    <label 
                        htmlFor="priority" 
                        className="text-sm"
                    >
                        Priority:
                    </label>
                    <select
                        className="border border-border rounded-md p-1 text-sm" 
                        id="priority"
                        value={priority}
                        onChange={(e) => {setPriority(Number(e.target.value))}}>
                        <option value={0}>
                            Low
                        </option>
                        <option value={1}>
                            Medium
                        </option>
                        <option value={2}>
                            High
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
};

CreateToDo.propTypes = {
    createToDo: PropTypes.func.isRequired,
}

export default CreateToDo;