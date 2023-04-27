import { useState, useEffect } from 'react';

import { getAllPokemons, filterByTypes } from 'services/pokeapi';

import PokemonsList from 'modules/PokemonsList';
import Section from 'components/Section';
import Hero from 'components/Hero/';
import Button from 'components/Button';
import Container from 'components/Container';
import PokemonInfo from 'modules/PokemonInfo';
import Filter from 'components/Filter';
import Loader from 'components/Loader';
import HiddenHeading from 'components/HiddenHeading';

export const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(12);
  const [isShownDetails, setIsShownDetails] = useState(false);
  const [id, setId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        if (filter === 'all') {
          const { results } = await getAllPokemons(offset);
          setItems(results)
        } else {
          const { pokemon } = await filterByTypes(filter);
          setItems(pokemon.map(el => el.pokemon));
        }
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, [offset, filter])

  const onLoadMore = () => {
    setOffset(prevOffset => prevOffset + 12);
  }

  const getDetails = id => {
    setId(id);
    setIsShownDetails(true);
  };

  const onFilterChange = ({ target }) => {
    setFilter(target.value);
  }

  return (
    <Section>
      <HiddenHeading>Pokedex</HiddenHeading>
      <Hero />
      <Filter onFilterChange={onFilterChange} />
      <Container>
        {loading && <Loader />}
        <PokemonsList items={items} getDetails={getDetails} />
        {isShownDetails && <PokemonInfo id={id} />}
      </Container>
      {filter === 'all' && <Button onClick={onLoadMore} text="Load More" />}
    </Section>
  );
};
