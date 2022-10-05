import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);   //[0] - name
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setsearchValue] = React.useState('');

  React.useEffect(() => {   //отправка запроса на backend
    fetch('https://reqres.in/api/users')
      .then(res => res.json())  //если получен успешный ответ преобразуем его в json
      .then(json => {
        setUsers(json.data);
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получении пользователей');
      }).finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setsearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    console.log(id);
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);   //меняем значение Success
  }

  return (
    <div className="App">
      {   // если success==true, рендерим success, иначе users
        success ? (<Success count={invites.length}/>) : (
          <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
          />
        )
      }
    </div>
  );
}

export default App;
