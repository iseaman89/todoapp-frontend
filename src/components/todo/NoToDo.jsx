import React from 'react';
import AcceptIcon from "../../assets/icon/acceept.png";

const NoToDo = () => {
    return (
        <div className="container flex flex-col items-center justify-center gap-2 w-full p-5">
            <img 
                src={AcceptIcon} 
                alt="Accept"
            />
            <span className="text-text-sub text-sm">
                No tasks found
            </span>
            <span className="text-text-sub text-sm">
                Try adjusting your search or filter
            </span>
        </div>
    );
};

export default NoToDo;