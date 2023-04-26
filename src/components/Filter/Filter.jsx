import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { getTypes } from "services/pokeapi";
import css from './filter.module.scss';


const Filter = ({ onFilterChange }) => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const { results } = await getTypes();
                setTypes(results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTypes();
    }, []);

    return (
        <div className={css.filter}>
            <label htmlFor="types" className={css.filter__label}>Filter by type</label>
            <select name="types" id="types" onChange={onFilterChange} className={css.filter__select}>
                <option key="all" value="all">
                all
                </option>
                {types.map((type, index) => (
                <option key={index} value={type.name}>
                    {type.name}
                </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;

Filter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};