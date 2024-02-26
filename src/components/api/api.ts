import md5 from 'md5';


export const API_URL = 'https://api.valantis.store:41000/';
// функция создания пароль_таймштамп
export const setAuthHeaders = () => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return md5(`${password}_${timestamp}`);
};
// функция запроса данных с сервера
export const fetchData = async () => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': setAuthHeaders()
      },
      body: JSON.stringify({
        "action": "get_ids",
        "params": {"offset": 0, "limit": 120}
      })
    });
    if (res.ok) {
      const data = await res.json();
      return data.result;
    } else {
      throw new Error('Ошибка получения данных');
    }
  } catch (e) {
    console.log(e);
  }
};
