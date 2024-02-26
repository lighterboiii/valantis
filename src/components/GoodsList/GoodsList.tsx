/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from './GoodsList.module.css';
import { getGoods } from "../api/api";
import Good from "../Good/Good";

const GoodsList: FC = () => {
  const [goodsList, setGoodsList] = useState<any>([]); // типизировать
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [searchString, setSearchString] = useState<string>('');
  const [filteredGoods, setFilteredGoods] = useState<any>([]); // типизировать

  // подсчёт количества страниц в зависимости от количества элементов
  const pages = Math.ceil(goodsList.length / 50);

  const getDataFromServer = async () => {
    const products = await getGoods();
    setGoodsList(products.flat());
    setFilteredGoods(products.flat());
    setTotalPages(pages);
  }
  console.log(goodsList);
  console.log(totalPages);
  // получение данных при монтировании компонента
  useEffect(() => {
    getDataFromServer();
  }, [])
  // функция, фильтрующая товары на основе строки в инпуте
  const filterGoods = (str: string) => {
    const filtered = goodsList.filter((product: any) => {
        const productNameMatch = product.product.toLowerCase().includes(str.toLowerCase());
        const idMatch = product.id.toLowerCase().includes(str.toLowerCase());
        const brandMatch = product.brand && product.brand.toLowerCase().includes(str.toLowerCase());
        const priceMatch = product.price && product.price.toString().toLowerCase().includes(str.toLowerCase());

        return productNameMatch || idMatch || brandMatch || priceMatch;
    });

    setFilteredGoods(filtered);
    setTotalPages(Math.ceil(filtered.length / 50));
    setPage(1);
};

  // хэндлер для фильтрации
  const handleFilterGoods = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value);
    filterGoods(evt.target.value);
  };
  // функция пагинации
  const setPagination = (array: any, length: number, pageNumber: number) => {
    return array.slice((pageNumber - 1) * length, pageNumber * length);
  }

  return (
    <div className={styles.goods}>
      <div className={styles.goods__inputWrapper}>
        <input
          type="text"
          name="goodsFilter"
          placeholder="Поиск товара"
          value={searchString}
          onChange={handleFilterGoods}
          className={styles.goods__input}
        />
      </div>
      <ul className={styles.goods__list}>
        {setPagination(filteredGoods, 50, page).map((item: any) => (
          <Good
            item={item}
          />
        ))}
      </ul>
    </div>
  )
};

export default GoodsList;