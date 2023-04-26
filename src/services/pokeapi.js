import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

export const getAllPokemons = async (limit = 12, offset) => {
    const {data} = await instance.get('/pokemon', {
        params: {
            limit,
            offset,
        }
    });  
    return data;
}

export const getPokemonDetails = async id => {
    const {data} = await instance.get(`/pokemon/${id}`);  
    return data;
}

export const getTypes = async (limit = 999) => {
    const {data} = await instance.get('/type', {
        params: {
            limit,
        }
    });
    return data;
}

export const filterByTypes = async (filter) => {
    const { data } = await instance.get(`/type/${filter}`);
    return data;
}