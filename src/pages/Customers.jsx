import React from "react";

import { Table } from "../components";

import customersList from "../assets/JsonData/customers-list.json";

const customerTableHead = ["id", "name", "email", "phone", "location"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id ?? '-'}</td>
    <td>{item.name ?? '-'}</td>
    <td>{item.email ?? '-'}</td>
    <td>{item.phone ?? '-'}</td>
    <td>{item.location ?? '-'}</td>
  </tr>
);

const Customers = () => {
  return (
    <div>
      <h2 className={"page-header"}>Customers</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              <Table
                limit={10}
                headData={customerTableHead}
                bodyData={customersList}
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
