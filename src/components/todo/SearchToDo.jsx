import React from 'react';
import FilterIcon from "../../assets/icon/filter.png";
import SearchIcon from "../../assets/icon/search.svg";
import PropTypes from "prop-types";

const SearchToDo = ({ toDos, setCurrentToDos }) => {
    const [filter, setFilter] = React.useState(4); // 4 = All Categories
    const [filterText, setFilterText] = React.useState("");
    
    React.useEffect(() => {
        const filtered = toDos.filter(todo => {
            const matchesText = todo.title.toLowerCase().includes(filterText.toLowerCase());
            const matchesCategory = filter === 4 || todo.category === filter;

            return matchesText && matchesCategory;
        });
        setCurrentToDos(filtered);
    }, [filterText, filter, toDos, setCurrentToDos]);

    return (
        <div className="flex items-center justify-center gap-2 w-full my-5">
            <div className="relative flex items-center w-3/4">
                <img 
                    src={SearchIcon} 
                    alt="Search" 
                    className="absolute left-3 top-1.5 w-4 h-4 z-10"
                />
                <input
                    className="input rounded-lg w-full px-9 py-1 text-sm border border-border"
                    placeholder="Search tasks..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-start gap-2 w-1/4">
                <img 
                    src={FilterIcon} 
                    alt="Filter"
                    className="w-5 h-5 opacity-70" 
                />
                <select
                    className="border border-border rounded-md px-3 py-2 w-full text-sm outline-none"
                    value={filter}
                    onChange={(e) => setFilter(Number(e.target.value))}
                >
                    <option value={4}>
                        All Categories
                    </option>
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
        </div>
    );
};

SearchToDo.propTypes = {
    toDos: PropTypes.array.isRequired,
    setCurrentToDos: PropTypes.func.isRequired
}

export default SearchToDo;