import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCustomers } from '../api/customers';
import Table from '../components/Table';

const customerTableHead = ['uid', 'username', 'email'];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.uid ?? '-'}</td>
    <td>{item.username ?? '-'}</td>
    <td>{item.email ?? '-'}</td>
  </tr>
);

const Customers = () => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(0);
  const { data, isLoading, isError } = useQuery(
    ['customers', page, pageSize],
    () => fetchCustomers('', page, pageSize),
  );

  if (isError) return <div>Error ...</div>;

  return (
    <div>
      <h2 className={'page-header'}>Customers</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              {isLoading ? (
                <div></div>
              ) : (
                <>
                  <Table
                    limit={20}
                    headData={customerTableHead}
                    bodyData={data!.data}
                    renderHead={(item, index) => renderHead(item, index)}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
