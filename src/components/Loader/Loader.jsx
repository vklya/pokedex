import pokeball from '../../images/pokeball.png';
import css from './loader.module.scss';

const Loader = () => <img src={pokeball} alt='loading...' className={css.loader} />;

export default Loader;