import React from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  height: ${(props) => (props.height ? props.height : null)};
  width: ${(props) => (props.width ? props.width : null)};
  /* background-color:eee; */
  border: ${(props) => (props.border ? props.border : '10px')} solid #f5f5f5;
  border-radius: 50%;
  border-top: ${(props) => (props.border ? props.border : '10px')} solid #808080;
  animation: spin 500ms linear infinite;
  margin-left: ${(props) => (props.marginleft ? props.marginleft : 0)};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ height, width, border, marginleft }) => {
  return (
    <StyledLoader
      height={height}
      width={width}
      border={border}
      marginleft={marginleft}
    />
  );
};

export default Loader;
