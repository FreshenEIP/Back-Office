import { StatusCard } from '../components/index';

const Dashboard = () => {
  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            <div className='col-6'>
              <StatusCard icon={'bx bx-user'} count={0} title={'Total users'} />
            </div>
            <div className='col-6'>
              <StatusCard
                icon={'bx bx-shopping-bag'}
                count={0}
                title={'Total friperies'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
