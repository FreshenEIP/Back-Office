import React from 'react'
import { Link } from 'react-router-dom'

import { StatusCard, Table } from '../components'

import statusCard from "../assets/JsonData/status_card.json"

const topCustomers = {
  head: [
    "user",
    "total post",
    "total like"
  ],
  body: [
    {
      "username": "john doe",
      "post": "15",
      "like": "30000"
    }
  ]
}

const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderCustomerBody = (item, index) => (
  <tr>
    <td>{item.username}</td>
    <td>{item.post}</td>
    <td>{item.like}</td>
  </tr>
)

const Dashboard = () => {
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {
              statusCard.map((item, index) => (
                <div className="col-6">
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
          </div>
        </div>
        <div className={"col-4"}>
          <div className="card">
            <div className="card__header">
              <h3>Top Customers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCustomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard