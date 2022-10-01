import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from '../components';

const customerTableHead = ['uid', 'username', 'email'];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.uid ?? '-'}</td>
    <td>{item.username ?? '-'}</td>
    <td>{item.email ?? '-'}</td>
  </tr>
);

const Customers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4500/back-office/users/')
      .then((value) => {
        setUserList(value.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2 className={'page-header'}>Customers</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              <Table
                limit={20}
                headData={customerTableHead}
                bodyData={userList}
                renderHead={(item, index) => renderHead(item, index)}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
