import { Link } from 'react-router-dom';
import userImage from '../assets/images/user_image.jpg';
import Dropdown from './Dropdown';

const currentUser = {
  displayName: 'Alexis Fabarez',
  image: userImage,
};

const renderUserToggle = (user) => (
  <div className='topnav__right-user'>
    <div className='topnav__right-user__image'>
      <img src={user.image} alt='' />
    </div>
    <div className='topnav__right-user__name'>{user.displayName}</div>
  </div>
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
          <Dropdown customToggle={() => renderUserToggle(currentUser)} />
        </div>
        <div className='topnav__right-item'>
          <Link to={'/logout'}>
            <div className={'notification-item'}>
              <i className={'bx bx-log-out-circle bx-rotate-180'}></i>
              <span>Logout</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
