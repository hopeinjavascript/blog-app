import React from 'react';
import { Link } from 'react-router-dom';

const TableData = ({ dataObj }) => {
  return (
    <>
      {Object.values(dataObj).map((value) => {
        return (
          <td key={value}>
            <Link
              to={`/users/${dataObj.username}`}
              state={{ userId: dataObj?._id }}>
              {value}
            </Link>
          </td>
        );
      })}
    </>
  );
};

export default TableData;
