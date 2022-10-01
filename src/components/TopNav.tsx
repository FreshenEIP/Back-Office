import { Link } from 'react-router-dom';
import userImage from '../assets/images/user_image.jpg';
import notifications from '../assets/JsonData/notification.json';
import userMenu from '../assets/JsonData/user_menus.json';
import Dropdown from './Dropdown';
import ThemeMenu from './ThemeMenu';

const currentUser = {
  displayName: 'Alexis Fabarez',
  image: userImage,
};

const renderNotificationItem = (item, index) => (
  <div className='notification-item' key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className='topnav__right-user'>
    <div className='topnav__right-user__image'>
      <img src={user.image} alt='' />
    </div>
    <div className='topnav__right-user__name'>{user.displayName}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to={'/'} key={index}>
    <div className={'notification-item'}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const TopNav = () => {
  return (
    <div className={'topnav'}>
      <div className={'topnav__search'}>
        <input type={'text'} placeholder={'Search here...'} />
        <i className='bx bx-search'></i>
      </div>
      <div className='topnav__status'></div>
      <div className='topnav__right'>
        <div className='topnav__right-item'>
          <Dropdown
            customToggle={() => renderUserToggle(currentUser)}
            contentData={userMenu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className='topnav__right-item'>
          <Dropdown
            icon='bx bx-bell bx-tada-hover'
            badge={Object.keys(notifications).length}
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            ù
            renderFooter={() => <Link to='/'>View All</Link>}
          />
        </div>
        <div className='topnav__right-item'>
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
