import { useQuery } from 'react-query';
import { fetchCustomers } from '../api/customers';
import { StatusCard } from '../components/index';
import config from '../config';

const Dashboard = () => {
  const getUserList = useQuery(['dashboard', 'user'], () =>
    fetchCustomers(config.TOKEN, 0, 20, '', '', ''),
  );
  const getFriperieList = useQuery(['dashboard', 'friperie'], () =>
    fetchCustomers(config.TOKEN, 0, 20, 'true', '', ''),
  );

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = getUserList;
  const {
    data: dataFriperie,
    isLoading: isLoadingFriperie,
    isError: isErrorFriperie,
  } = getFriperieList;

  if (isErrorFriperie || isErrorUser) return <div>Error ...</div>;

  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            {isLoadingUser || isLoadingFriperie ? (
              <>
                <div className='col-6'>
                  <StatusCard
                    icon={'bx bx-user'}
                    count={0}
                    title={'Total users'}
                  />
                </div>
                <div className='col-6'>
                  <StatusCard
                    icon={'bx bx-shopping-bag'}
                    count={0}
                    title={'Total friperies'}
                  />
                </div>
              </>
            ) : (
              <>
                <div className='col-6'>
                  <StatusCard
                    icon={'bx bx-user'}
                    count={dataUser.count}
                    title={'Total users'}
                  />
                </div>
                <div className='col-6'>
                  <StatusCard
                    icon={'bx bx-shopping-bag'}
                    count={dataFriperie.count}
                    title={'Total friperies'}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
