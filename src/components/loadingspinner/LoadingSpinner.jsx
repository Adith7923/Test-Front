import React from "react";
import { TailSpin } from "react-loader-spinner";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({
  height = 50,
  width = 50,
  color = "var(--primary-color)",
}) => {
  return (
    <div className={styles.loadingContainer}>
      <TailSpin
        height={height}
        width={width}
        color={color}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
