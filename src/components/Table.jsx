import React, {useCallback, useEffect, useState} from "react";

const Table = (props) => {
  const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, props.limit)
      : props.bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);
  const [currentPage, setCurrentPage] = useState(0);

  let pages = 1;
  let range = [];

  const selectPage = useCallback((page) => {
    const start = props.limit * page;
    const end = start + props.limit;

    setDataShow(props.bodyData.slice(start, end));
    setCurrentPage(page);
  }, [props.bodyData, props.limit]);

  useEffect(() => {
    selectPage(currentPage)
  }, [currentPage, props.bodyData, selectPage]);


  if (props.limit !== undefined) {
    const page = Math.floor(props.bodyData.length / props.limit);
    pages = props.bodyData.length % (props.limit === 0) ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  return (
    <div>
      <div className='table-wrapper'>
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index),
                )}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <tbody>
              {dataShow.map((item, index) => props.renderBody(item, index))}
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
                currentPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}>
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
