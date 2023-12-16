import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

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
          <Link className='topnav__right-user' to={'/profile'}>
            <div className='topnav__right-user__image'>
              <img src={decoded.profile_picture} alt='' />
            </div>
            <div className='topnav__right-user__name'>{decoded.username}</div>
          </Link>
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
