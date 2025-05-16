import React, { useState } from "react";
import styles from "./ListItem.module.css";

const ListItem = ({ icon, name, active, onClick, viewIcon }) => {
  const listItemClassName = `${styles.listItem} ${active ? styles.active : ""}`;

  return (
    <div className={listItemClassName} onClick={onClick}>
      {viewIcon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default ListItem;
