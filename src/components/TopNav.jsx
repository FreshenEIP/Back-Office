import React from 'react'
import Dropdown from './Dropdown'

import notifications from "../assets/JsonData/notification.json"
import { Link } from 'react-router-dom'

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const TopNav = () => {
  return (
    <div className={"topnav"}>
      <div className={"topnav__search"}>
        <input type={"text"} placeholder={"Search here..."}/>
        <i className='bx bx-search'></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            icon='bx bx-user'
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon='bx bx-bell'
            badge={Object.keys(notifications).length}
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}ù
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown />
        </div>
      </div>
    </div>
  )
}

export default TopNav