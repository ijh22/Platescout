import "./SearchBar.css";
import { useEffect, useState } from "react";
const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count"
};

// function renderSortByOptions() {
//     return Object.keys(sortByOptions).map(sortByOption => {
//         let sortByOptionValue = sortByOptions[sortByOption];
//         return <li key={sortByOptionValue}>{sortByOption}</li>;
//     });
// }

function SearchBar(props) {
    const [term, setTerm] = useState();
    const [location, setLocation] = useState();
    const [sortBy, setSortBy] = useState();

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSortByChange = (sortByOption) => {
        setSortBy(sortByOption);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        props.searchYelp(term, location, sortBy);
    };

    const getSortByClass = (sortByOption) => {
        return sortBy === sortByOption ? 'active' : '';
    };

    const renderSortByOptions = () => {
        return Object.keys(sortByOptions).map((sortByOption) => {
            const sortByOptionValue = sortByOptions[sortByOption];
            return (
            <li
                className={getSortByClass(sortByOptionValue)}
                key={sortByOptionValue}
                onClick={() => handleSortByChange(sortByOptionValue)}>
                {sortByOption}
            </li>
            );
        });
    };

    useEffect(() => {
        if (term === '') {
        document.title = 'PlateScout';
        } else {
        document.title = `PlateScout — Searching for ${term}`;
        }
    }, [term]);

    return (
        <div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input placeholder="Search Businesses" 
                value={term}
                onChange={handleTermChange}
                />
                <input placeholder="Where?" 
                value={location}
                onChange={handleLocationChange}
                />
            </div>
            <div className="SearchBar-submit">
                <button onClick={handleSearch}>Let's Go</button>
            </div>
        </div>
    );
}

export default SearchBar;