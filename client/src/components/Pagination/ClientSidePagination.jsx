import React, { useEffect, useState } from 'react';
import CONFIGS from '../../configs/pagination.json';
import './Pagination.css';

// TODO: Implement Next and Previous for Page and Page Set both
// TODO: server side pagination - total pages & page number state
const ClientSidePagination = ({ list, render }) => {
  // DERIVED
  const [data, setData] = useState(list ?? []); // derived from fetch request
  const [visibleData, setVisibleData] = useState([]); // derived from "data" state
  // DEFAULT
  // default values to use while rendering 1st time should always be set while declaring useState
  // BASIC but worth remembering to save time/plan.
  const [dataPerPage, setDataPerPage] = useState(CONFIGS.DATA_PER_PAGE);
  const [btnCounter, setBtnCounter] = useState(
    data.length / CONFIGS.DATA_PER_PAGE
  ); // Should be derived? (1.)
  const [activeButton, setActiveButton] = useState(true);

  useEffect(() => {
    console.log('effect 2');
    setActiveButton(`active-1`);
    setVisibleData(data.slice(0, CONFIGS.DATA_PER_PAGE));
  }, [data]);

  const dataPerPageHandler = (e) => {
    const val = e.target.value;
    setDataPerPage(val);
    setActiveButton(`active-1`);
    setVisibleData(data.slice(0, val));
    setBtnCounter(data.length / val);
  };

  const changeData = (e) => {
    let pageNo = e.target.innerText,
      end = dataPerPage * pageNo,
      start = end - dataPerPage;
    // console.table({ pageNo, start, end });
    setActiveButton(`active-${pageNo}`);
    setVisibleData(data.slice(start, end));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // buttons
  const elem = btnCounter > 1 && (
    <div className="btns">
      {Array(Math.ceil(btnCounter)) // (1.) data.length / CONFIGS.DATA_PER_PAGE
        .fill()
        .map((el, i) => {
          return (
            <button
              key={i}
              onClick={changeData}
              className={
                activeButton === `active-${i + 1}` ? 'btn btn-active' : 'btn'
              }
              // can use above className or below style attribute syntax
              //   {...(activeButton === `active-${i + 1}` && {
              //     style: ACTIVE_BUTTON_STYLES,
              //   })}
            >
              {i + 1}
            </button>
          );
        })}
    </div>
  );

  if (!data.length) return <h1>Loading...</h1>;

  return (
    <>
      <div className="pagination-wrapper">
        {/* <h2>Client side Pagination</h2>
        <h4>
          Total data : {data.length} | Visible data : {visibleData.length} |
        </h4>
        <span> Data Per Page : </span> */}
        <div>
          {/* <select
            name="dataPerPage"
            id="dataPerPage"
            onChange={dataPerPageHandler}>
            {CONFIGS.OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select> */}
        </div>

        {elem}
        {visibleData.map(render)}

        {elem}
      </div>
    </>
  );
};

export default ClientSidePagination;
