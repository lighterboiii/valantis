import GoodsList from '../GoodsList/GoodsList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.app__heading}>Интернет-магазин</h1>
      <GoodsList />
    </div>
  );
}

export default App;
