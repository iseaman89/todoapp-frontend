import React from 'react';
import PropTypes from "prop-types";

const Progress = ({ toDos }) => {
    const completedCount = toDos.filter(todo => todo.isCompleted).length;
    const totalCount = toDos.length;
    const progressPercent = totalCount > 0
        ? Math.round((completedCount / totalCount) * 100)
        : 0;

    return (
        <div className="container flex flex-col gap-2 p-4 w-full">
            <div className="flex items-center justify-between w-full">
                <span className="text-sm">
                    Progress
                </span>
                <span className="text-sm">
                    {progressPercent}%
                </span>
            </div>
            <div className="w-full h-2 bg-input rounded-full overflow-hidden">
                <div
                    className="h-full bg-progress transition-all duration-500 ease-out"
                    style={{ 
                        width: `${progressPercent}%`,
                        background: 'var(--color-progress)'
                }}
                />
            </div>
        </div>
    );
};

Progress.propTypes = {
    toDos: PropTypes.array.isRequired
}

export default Progress;