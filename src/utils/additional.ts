// ф-ция разбиения получаемых данных на массивы с определенным количеством элементов
export const sliceIdArray = (array: string[], limit: number) => {
  const sliced = [];
  for (let i = 0; i < array.length; i += limit) {
    sliced.push(array.slice(i, i + limit));
  }
  return sliced;
};