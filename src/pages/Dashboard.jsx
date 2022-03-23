import React from 'react'

import { StatusCard } from '../components'

import statusCard from "../assets/JsonData/status_card.json"

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
      </div>
    </div>
  )
}

export default Dashboard