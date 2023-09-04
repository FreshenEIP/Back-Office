import { useState } from 'react';
import { StatusCard } from '../components/index';

const Dashboard = () => {
  const [infoCards, _] = useState({
    users: {
      icon: 'bx bx-user',
      title: 'Total users',
    },
    friperies: {
      icon: 'bx bx-shopping-bag',
      title: 'Total friperies',
    },
  });

  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            {Object.keys(infoCards).map((key, index) => (
              <div className='col-6' key={index}>
                <StatusCard
                  icon={infoCards[key].icon}
                  count={0}
                  title={infoCards[key].title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
