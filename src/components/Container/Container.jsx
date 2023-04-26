import css from './container.module.scss';

const Container = ({ children }) => (
    <div className={css.container}>{children}</div>
);

export default Container;