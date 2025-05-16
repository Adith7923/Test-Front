import React from "react";
import styles from "./Table.module.css";

const Table = ({ data, headings ,noData}) => (
  <div className={styles["table-container"]}>
    <table>
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headings.length} className={styles["no-data"]}>
            {noData}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
