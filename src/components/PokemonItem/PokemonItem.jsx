import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

import defaultAvatar from '../../images/defaultAvatar.png';

import typeColor from 'utils/typeColor';

import css from './item.module.scss';

const PokemonItem = ({ item, index, getDetails }) => {
    const [name, setName] = useState('');
    const [types, setTypes] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [id, setId] = useState(null);

    const { url } = item;

    useEffect(() => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { name, types, sprites, id } = data;
                const avatar = sprites.other.home.front_default;
                setName(name);
                setTypes(types);
                setAvatar(avatar);
                setId(id);
            });
    }, [url]);

        return (
            <li
            key={index}
            className={css.pokemons__item}
            onClick={() => getDetails(id)}
            >
            <img
                loading="lazy"
                src={avatar ? avatar : defaultAvatar}
                alt={avatar ? name : "No avatar"}
                className={css.pokemons__image}
            />
            <div className={css.pokemons__info}>
                <h2 className={css.pokemons__name}>{name}</h2>
                <ul className={css.pokemons__types}>
                    {types.map(item => {
                        for (let type in typeColor) {
                            if (item.type.name === type) {
                                return (
                                    <li
                                        key={item.slot}
                                        style={{ backgroundColor: typeColor[type] }}
                                        className={css.pokemons__type}
                                    >
                                        {item.type.name}
                                    </li>
                                );
                            }
                        }
                    })}
                </ul>
                </div>

            </li>
        );

};

export default memo(PokemonItem);

PokemonItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    getDetails: PropTypes.func.isRequired,
};