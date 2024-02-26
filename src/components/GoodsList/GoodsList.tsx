import { FC, useEffect, useState } from "react";
import styles from './GoodsList.module.css';
import { getGoods } from "../api/api";

const GoodsList: FC = () => {
  const [goodsList, setGoodsList] = useState<any>([]); // типизировать
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  // подсчёт количества страниц в зависимости от количества элементов
  const pages = Math.ceil(goodsList.length / 50);

  const getDataFromServer = async () => {
    const products = await getGoods();
    setGoodsList(products.flat());
    setTotalPages(pages);
  }
  console.log(goodsList);
  console.log(totalPages);

  useEffect(() => {
    getDataFromServer();
  }, [])


  return <div className={styles.goods}>Goods</div>
};

export default GoodsList;