import React from 'react';
import TableData from '../TableData/TableData';

const TableRow = function ({ data }) {
  return (
    <>
      {data.map((dataObj) => {
        return (
          <tr key={dataObj._id}>
            <TableData dataObj={dataObj} />
          </tr>
        );
      })}
    </>
  );
};

export default TableRow;
