import css from './section.module.scss';

const Section = ({ children }) => (
    <section className={css.section}>{children}</section>
);

export default Section;