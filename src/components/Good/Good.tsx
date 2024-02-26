import { FC } from "react";
import styles from './Good.module.css';

interface IGood {
  item: any;
}

const Good: FC<IGood> = ({ item }) => {
  return (
    <li key={item.id} className={styles.good}>
      <p>{item.product}</p>
      <p>{item.brand}</p>
      <p>{item.price}</p>
      <p>id: {item.id}</p>
    </li>
  )
};

export default Good;