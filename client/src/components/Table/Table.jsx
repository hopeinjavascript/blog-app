import React from 'react';
import './Table.css';
import TableComponents from './index';

const Table = ({ data, config }) => {
  const { columns } = config;

  const filteredHeaders = columns.filter((columnName) =>
    Object.keys(data[0]).includes(columnName)
  );

  const filteredData = data.map((d) => {
    return filteredHeaders.reduce((obj, header) => {
      obj[header] = d[header];

      return obj;
    }, {});
  });

  console.log({ filteredData }); // this is returning array of values and not array of key vlaue pairs

  return (
    <div className="table">
      <TableComponents.TableHeader headers={filteredHeaders} />
      <TableComponents.TableRow data={filteredData} />
    </div>
  );
};

export default Table;
