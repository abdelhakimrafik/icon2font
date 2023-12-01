import css from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <span className={css.version}>v2.0.1</span>
    </footer>
  );
}
