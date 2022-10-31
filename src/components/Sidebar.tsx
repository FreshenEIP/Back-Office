import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import sidebar_items from '../assets/JsonData/sidebar_routes.json';
import SidebardItem from './SidebardItem';

const Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname,
  );

  return (
    <div className={'sidebar'}>
      <div className={'sidebar__logo'}>
        <img src={logo} alt={'company logo'} />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebardItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;