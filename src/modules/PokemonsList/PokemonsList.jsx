import PropTypes from 'prop-types';
import css from './list.module.scss';

import PokemonItem from "components/PokemonItem";

const PokemonsList = ({ items, getDetails }) => {

  const pokemon = items.map((item, index) => (
    <PokemonItem
      item={item}
      index={index}
      getDetails={getDetails}
    />
  ));

  return  (
    <ul className={css.pokemons}>
      {pokemon}
    </ul>
  );
};

export default PokemonsList;

PokemonsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  getDetails: PropTypes.func.isRequired,
};