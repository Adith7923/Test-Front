import React from "react";
import styles from "../AdminCollege.module.css";
import Table from "../../../components/table/Table";

const CollegeList = ({ data, headings }) => {
  return (
    <div className={`${styles["collegelist-container"]}`}>
      <div className={`${styles["collegelist-college"]}`}>College List</div>
      <div className={`${styles["collegelist-table"]}`}>
        <Table data={data} headings={headings} />
      </div>
    </div>
  );
};

export default CollegeList;