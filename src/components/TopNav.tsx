import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Dropdown from './Dropdown';

const renderUserToggle = (user) => (
  <div className='topnav__right-user'>
    <div className='topnav__right-user__image'>
      <img src={user.image} alt='' />
    </div>
    <div className='topnav__right-user__name'>{user.displayName}</div>
  </div>
);

const TopNav = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const decoded: any = jwtDecode(logReducer.accessToken);
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
            customToggle={() =>
              renderUserToggle({
                image: decoded.profile_picture,
                displayName: decoded.username,
              })
            }
          />
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
