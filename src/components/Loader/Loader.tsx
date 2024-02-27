import { FC } from "react"
import styles from './Loader.module.css';

interface ILoader {
  text: string;
}

const Loader: FC<ILoader> = ({ text }) => {
  return <div className={styles.loader}>{text}</div>;
}

export default Loader;