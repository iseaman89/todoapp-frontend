import React from "react";
import ToDoContainer from "../containers/ToDoContainer.jsx";

const ToDoPage = () => {
    return (
        <section className="flex flex-col items-center justify-center p-5 w-full">
            <ToDoContainer />
        </section>
    )
};

export default ToDoPage;