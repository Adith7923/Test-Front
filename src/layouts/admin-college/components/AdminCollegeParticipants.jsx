import React from "react";
import Table from "../../../components/table/Table";
import NavButton from "../../../components/buttons/NavButton";
import styles from "../AdminCollege.module.css";
import NoData from "../../../components/nodata/NoData";

const AdminCollegeParticipants = ({count, pageName, data, onClick }) => {
  return (
    <div
      className={`${styles["admincollegeparticipants-container"]}`}
    >
      <div className={`${styles["admincollegeparticipants-header"]}`}>
        <div className={`${styles["admincollegeparticipants-navbuttons"]}`}>
          <NavButton pageName={pageName} onClick={onClick} /> <p className={`${styles["admincollegeparticipants-navcount"]}`} >(Count:{count})</p>
        </div>
      </div>
      <div className={`${styles["admincollegeparticipants-table"]}`}>
        {data && data.data.length>0? (
          <Table data={data.data} headings={data.headings} />
        ) : (
          <p style={{ padding:"2vh 0vw", color: "white" ,marginTop:"30px"}}>No Students to display</p>
        )}
      </div>
    </div>
  );
};

export default AdminCollegeParticipants;
