import { useCallback, useEffect, useState } from 'react';

interface Props {
  bodyData: any;
  headData: any;
  renderHead: (item: any, index: number) => void;
  renderBody: (item: any, index: number) => void;
  limit?: number;
}

const Table: React.FC<Props> = ({
  bodyData,
  limit,
  headData,
  renderHead,
  renderBody,
}) => {
  const initDataShow = limit && bodyData ? bodyData.slice(0, limit) : bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);
  const [currentPage, setCurrentPage] = useState(0);

  let pages = 1;
  let range = [];

  const selectPage = useCallback(
    (page) => {
      const start = limit * page;
      const end = start + limit;

      setDataShow(bodyData.slice(start, end));
      setCurrentPage(page);
    },
    [bodyData, limit],
  );

  useEffect(() => {
    selectPage(currentPage);
  }, [currentPage, bodyData, selectPage]);

  if (limit !== undefined) {
    const page = Math.floor(bodyData.length / limit);
    pages = bodyData.length % (limit === 0 ? page : page + 1);
    range = [...Array(pages).keys()];
  }

  return (
    <div>
      <div className='table-wrapper'>
        <table>
          {headData && renderHead ? (
            <thead>
              <tr>{headData.map((item, index) => renderHead(item, index))}</tr>
            </thead>
          ) : null}
          {bodyData && renderBody ? (
            <tbody>
              {dataShow.map((item, index) => renderBody(item, index))}
            </tbody>
          ) : null}
        </table>
      </div>
      {pages > 1 ? (
        <div className='table__pagination'>
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currentPage === index ? 'active' : ''
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
