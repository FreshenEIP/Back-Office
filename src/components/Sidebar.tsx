import { Link } from 'react-router-dom';

import React from 'react';
import {
  BiCategoryAlt,
  BiCommentDetail,
  BiMailSend,
  BiNews,
  BiNote,
  BiStore,
  BiUserPin,
} from 'react-icons/bi';
import logo from '../assets/images/logo.png';
import sidebarAction from '../redux/actions/sidebarAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import SidebardItem from './SidebardItem';

const Sidebar = () => {
  //@ts-ignore
  const sidebarReducer = useAppSelector((state) => state.sidebarReducer);
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const dispatch = useAppDispatch();

  if (logReducer.roles === 'freshen:admin')
    return (
      <div className={'sidebar'}>
        <div className={'sidebar__logo'}>
          <img src={logo} alt={'company logo'} />
        </div>
        <Link
          to={'/dashboard'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(0))}
        >
          <SidebardItem
            title={'Dashboard'}
            icon={<BiCategoryAlt />}
            active={sidebarReducer.index === 0}
          />
        </Link>
        <Link
          to={'/customers'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(1))}
        >
          <SidebardItem
            title={'Customers'}
            icon={<BiUserPin />}
            active={sidebarReducer.index === 1}
          />
        </Link>
        <Link
          to={'/friperie'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(2))}
        >
          <SidebardItem
            title={'Friperie'}
            icon={<BiUserPin />}
            active={sidebarReducer.index === 2}
          />
        </Link>
        <Link
          to={'/comments'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(3))}
        >
          <SidebardItem
            title={'Comments'}
            icon={<BiCommentDetail />}
            active={sidebarReducer.index === 3}
          />
        </Link>
        <Link
          to={'/reports'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(4))}
        >
          <SidebardItem
            title={'Reports'}
            icon={<BiNote />}
            active={sidebarReducer.index === 4}
          />
        </Link>
        <Link
          to={'/brands'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(5))}
        >
          <SidebardItem
            title={'Brands'}
            icon={<BiStore />}
            active={sidebarReducer.index === 5}
          />
        </Link>
        <Link
          to={'/news'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(6))}
        >
          <SidebardItem
            title={'News'}
            icon={<BiNews />}
            active={sidebarReducer.index === 6}
          />
        </Link>
        <Link
          to={'/suggestion'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(7))}
        >
          <SidebardItem
            title={'Suggestion'}
            icon={<BiMailSend />}
            active={sidebarReducer.index === 7}
          />
        </Link>
      </div>
    );
  else
    return (
      <div className={'sidebar'}>
        <div className={'sidebar__logo'}>
          <img src={logo} alt={'company logo'} />
        </div>
        <Link
          to={'/dashboard'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(0))}
        >
          <SidebardItem
            title={'Dashboard'}
            icon={<BiCategoryAlt />}
            active={sidebarReducer.index === 0}
          />
        </Link>
        <Link
          to={'/news'}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(1))}
        >
          <SidebardItem
            title={'News'}
            icon={<BiNews />}
            active={sidebarReducer.index === 1}
          />
        </Link>
      </div>
    );

  // return (
  //   <div className={'sidebar'}>
  //     <div className={'sidebar__logo'}>
  //       <img src={logo} alt={'company logo'} />
  //     </div>
  //     {sidebar_items.map((item, index) => (
  //     ))}
  //   </div>
  // );
};

export default Sidebar;
