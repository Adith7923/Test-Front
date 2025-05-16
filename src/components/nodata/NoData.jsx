import React from "react";

const NoData = ({ title }) => {
  return (
    <div style={{marginTop:"30px"}}>
      <a style={{ padding:"2vh 4vw", color: "white" }}>No {title} to display</a>
    </div>
  );
};

export default NoData;
