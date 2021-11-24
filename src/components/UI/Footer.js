import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        created by <a href="https://github.com/Tobias235">Tobias235</a> -
        devChallenges.io
      </p>
    </footer>
  );
};

export default Footer;
