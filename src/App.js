import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {

  // сделать запрос при первом рендере к API
  const [collection, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    // limit показывает макс. кол-во блоков на странице
    fetch(`https://633ab3c8471b8c395572bfe8.mockapi.io/collections?page=${page}&limit=2&${category}`,)
      .then((res) => res.json())
      .then((json) => {
        setCollection(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных из API');
      })
      // Как только все завершится поменять значение isLoading на false
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) =>
              //при клике передаем новый CategoryId
              <li
                onClick={() => setCategoryId(i)}
                className={categoryId == i ? 'active' : ''} key={obj.name}>
                {obj.name}
              </li>)
          }
        </ul>
        <input value={searchValue}
          // котролируемый input
          onChange={e => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {   // Если идет isLoading == true пишем "Идет загрузка...", иначе
          // рендерим то, что нужно
          isLoading ? (<h2>Идет загрузка...</h2>) : (
            collection
              .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((obj, index) => (
                <Collection
                  //передать данные из API
                  key={index}
                  name={obj.name}
                  images={obj.photos}
                />
              ))
          )
        }
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page == i + 1 ? 'active' : ''}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
