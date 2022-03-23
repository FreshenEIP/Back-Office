import React from 'react'
import { Link } from 'react-router-dom'

import Dropdown from './Dropdown'
import userImage from "../assets/images/user_image.jpg"
import notifications from "../assets/JsonData/notification.json"
import userMenu from "../assets/JsonData/user_menus.json"

const currentUser = {
  displayName: "Alexis Fabarez",
  image: userImage
}

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt=""/>
    </div>
    <div className="topnav__right-user__name">
      {user.displayName}
    </div>
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
            customToggle={() => renderUserToggle(currentUser)}
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