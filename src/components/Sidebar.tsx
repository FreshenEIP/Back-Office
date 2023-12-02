import { Link } from 'react-router-dom';

import sidebar_items from '../assets/JsonData/sidebar_routes.json';
import logo from '../assets/images/logo.png';
import sidebarAction from '../redux/actions/sidebarAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import SidebardItem from './SidebardItem';

const Sidebar = () => {
  //@ts-ignore
  const sidebarReducer = useAppSelector((state) => state.sidebarReducer);
  const dispatch = useAppDispatch();

  return (
    <div className={'sidebar'}>
      <div className={'sidebar__logo'}>
        <img src={logo} alt={'company logo'} />
      </div>
      {sidebar_items.map((item, index) => (
        <Link
          to={item.route}
          key={index}
          onClick={() => dispatch(sidebarAction.setSideBarIndex(index))}
        >
          <SidebardItem
            title={item.display_name}
            icon={item.icon}
            active={index === sidebarReducer.index}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
