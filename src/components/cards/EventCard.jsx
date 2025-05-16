import React from "react";
import styles from "./EventCard.module.css";


const EventCard = (props) => {
  const {
    main = "All hands meeting",
    sub = "",
    start = "10:30am",
    end = "11:30am",
    status = "due",
    mode = "dark",
    date = 17,
    handleClick,
  } = props;

  const formatText = (text) => {
    if (text.length > 20) {
      text = text.slice(0, 17) + "... ";
    }
    return text;
  };

  return (
    <div
      className={`${styles["event-card"]} ${styles[mode]}`}
      onClick={handleClick}
    >
      <div className={`${styles["card-contents"]}`}>
        <div className={`${styles["event-date"]}`}>
          <h3 className={`${styles.date}`}>{date}</h3>
        </div>
        <div className={`${styles["event-details"]}`}>
          <div className={`${styles["details-left"]}`}>
            <h1 className={`${styles.main}`} title={main}>{formatText(main)}</h1>
            <h4 className={`${styles.sub}`} title={sub}>
                  {formatText(sub)}
            </h4>
          </div>

          <div className={`${styles["details-right"]}`}>
            <ul>
              <li className={styles.hello}>
                <span
                  className={`${styles.duration}`}
                >{`${start} - ${end}`}</span>
              </li>
            </ul>

            <h4 className={`${styles.status} ${styles[status]}`}>
              {status === "upcoming"
                ? "Upcoming"
                : status === "due"
                  ? "Due soon"
                  : status === "happening"
                    ? "Happening now"
                    : "TBA"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
