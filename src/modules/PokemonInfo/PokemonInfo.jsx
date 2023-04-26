import { useState, useEffect, memo } from "react";
import PropTypes from 'prop-types';

import css from './info.module.scss';

import defaultAvatar from '../../images/defaultAvatar.png';

import Loader from "components/Loader";

import { getPokemonDetails } from 'services/pokeapi';

const PokemonInfo = ({id}) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
    const fetchPokemon = async () => {
        if (!id) return;
      try {
        const data = await getPokemonDetails(id);
        setItem({
          avatar: data.sprites.other.home.front_default,
          name: data.name,
          types: data.types.reduce((acc, el) => `${acc} ${el.type.name}`, ''),
          stats: data.stats,
          weight: data.weight,
          totalMoves: data.moves.length,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
    }, [id, setItem]);
    
  return (
    item && (
        <div className={css.information}>
          <img
            src={item.avatar ? item.avatar : defaultAvatar}
            alt={item.avatar ? item.name : 'No avatar'}
            className={css.information__image}
          />
          <h2 className={css.information__name}>{item.name}</h2>
          <table className={css.information__table}>
            <tbody>
              <tr>
                <td className={css.information__cell}>Type</td>
                <td className={css.information__cell}>{item.types}</td>
              </tr>
              <tr>
                <td className={css.information__cell}>Attack</td>
                <td className={css.information__cell}>
                  {item.stats[1].base_stat}
                </td>
              </tr>
              <tr>
                <td className={css.information__cell}>Defence</td>
                <td className={css.information__cell}>
                  {item.stats[2].base_stat}
                </td>
              </tr>
              <tr>
                <td className={css.information__cell}>HP</td>
                <td className={css.information__cell}>
                  {item.stats[0].base_stat}
                </td>
              </tr>
              <tr>
                <td className={css.information__cell}>SP attack</td>
                <td className={css.information__cell}>
                  {item.stats[3].base_stat}
                </td>
              </tr>
              <tr>
                <td className={css.information__cell}>SP defence</td>
                <td className={css.information__cell}>
                  {item.stats[4].base_stat}
                </td>
              </tr>
              <tr>
                <td className={css.information__cell}>Speed</td>
                <td className={css.information__cell}>
                  {item.stats[5].base_stat}
                </td>
              </tr>
              <tr>
                <td className={css.information__cell}>Weight</td>
                <td className={css.information__cell}>{item.weight}</td>
              </tr>
              <tr>
                <td className={css.information__cell}>Total moves</td>
                <td className={css.information__cell}>{item.totalMoves}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) 
    );

}

export default memo(PokemonInfo);

PokemonInfo.propTypes = {
  id: PropTypes.number,
};