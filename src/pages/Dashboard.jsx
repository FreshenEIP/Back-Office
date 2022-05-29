import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, StatusCard, Table } from '../components';

const tableHead = {
  customers: ['user', 'total posts', 'total likes'],
  reports: ['user', 'reported by', 'date', 'priority', 'actions'],
};

const topCustomersBody = [
  {
    username: 'john doe',
    post: '15',
    like: '30000',
  },
];

const latestReportsBody = [
  {
    username: 'john doe',
    by: 'jane doe',
    date: '28/03/2022',
    type: 'low',
  },
];

const reportType = {
  'very high': 'danger',
  high: 'warning',
  normal: 'success',
  low: 'secondary',
  'very low': 'primary',
};

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.post}</td>
    <td>{item.like}</td>
  </tr>
);

const renderReportsBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.by}</td>
    <td>{item.date}</td>
    <td>
      {/*@ts-ignore*/}
      <Badge type={reportType[item.type]} content={item.type} />
    </td>
    <td>Actions</td>
  </tr>
);

const Dashboard = () => {
  const [infoCards, setInfoCards] = useState({
    users: {
      icon: 'bx bx-user',
      count: 0,
      title: 'Total users',
    },
    friperies: {
      icon: 'bx bx-shopping-bag',
      count: 0,
      title: 'Total friperies',
    },
  });

  useEffect(() => {
    axios
      .get('http://localhost:4500/back-office/users/number')
      .then((value) => {
        setInfoCards((prevState) => ({
          ...prevState,
          users: {
            ...prevState.users,
            count: value.data.number_users,
          },
        }));
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get('http://localhost:4500/friperies/number')
      .then((value) => {
        setInfoCards((prevState) => ({
          ...prevState,
          friperies: {
            ...prevState.friperies,
            count: value.data.number_friperies,
          },
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            {Object.keys(infoCards).map((key, index) => (
              <div className='col-6' key={index}>
                <StatusCard
                  icon={infoCards[key].icon}
                  count={infoCards[key].count}
                  title={infoCards[key].title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='col-6'>
          <div className='card full-height'></div>
        </div>
        <div className={'col-4'}>
          <div className='card'>
            <div className='card__header'>
              <h3>Top Customers</h3>
            </div>
            <div className='card__body'>
              <Table
                headData={tableHead.customers}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={topCustomersBody}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className='card__footer'>
              <Link to='/customers'>View All</Link>
            </div>
          </div>
        </div>
        <div className={'col-8'}>
          <div className='card'>
            <div className='card__header'>
              <h3>Latest reports</h3>
            </div>
            <div className='card__body'>
              <Table
                headData={tableHead.reports}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={latestReportsBody}
                renderBody={(item, index) => renderReportsBody(item, index)}
              />
            </div>
            <div className='card__footer'>
              <Link to='/reports'>View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
