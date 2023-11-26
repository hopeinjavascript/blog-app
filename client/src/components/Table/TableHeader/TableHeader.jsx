import React from 'react';

const TableHeader = ({ headers }) => {
  return (
    <>
      {headers.map((header) => {
        return <th key={header}>{header}</th>;
      })}
    </>
  );
};

export default TableHeader;
