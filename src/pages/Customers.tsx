import React, {useEffect, useState} from "react";

import {Table} from "../components";

import {user} from "../interface/customer/customer";
import axios from "axios";

const customerTableHead = ["uid", "username", "email"];

const renderHead = (item: any, index: number) => <th key={index}>{item}</th>;

const renderBody = (item: user, index: number) => (
  <tr key={index}>
    <td>{item.uid ?? '-'}</td>
    <td>{item.username ?? '-'}</td>
    <td>{item.email ?? '-'}</td>
  </tr>
);

const Customers = () => {
  const [userList, setUserList] = useState<user[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4500/back-office/users/')
      .then(value => {
        setUserList(value.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h2 className={"page-header"}>Customers</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              <Table
                limit={20}
                headData={customerTableHead}
                bodyData={userList}
                renderHead={(item: any, index: number) => renderHead(item, index)}
                renderBody={(item: user, index: number) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
