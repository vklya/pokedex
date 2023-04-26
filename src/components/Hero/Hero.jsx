import hero from '../../images/hero.png';
import css from './hero.module.scss';

const Hero = () => {
    return (
        <img src={hero} alt="Pokedex" className={css.hero} />
    );
};

export default Hero;
