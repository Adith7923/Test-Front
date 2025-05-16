import React from "react";
import styles from "../Common.module.css";
import NavButton from "../../../components/buttons/NavButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

const EventsDescription = (props) => {
  const {
    exploreEvent,
    eventTitle,
    eventType,
    eventMode,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    link,
    speakers = [],
    organizer,
    fraction,
    percentage,
    button,
    small,
    medium,
    large,
    type,
    smaller,
    onclick1,
    onclick2,
    onclick3,
    showButton,
    isRegistered,
    role,
  } = props;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  function formatTime(timeString) {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const convertedHours = hours % 12 || 12;
    const amPm = hours < 12 ? "AM" : "PM";
    return `${convertedHours.toString().padStart(2, "0")}:${minutes} ${amPm}`;
  }

  const locationLabel = eventMode === "Offline" ? "Location" : "Link";
  let locationValue = eventMode === "Offline" ? location : link;

  if (new Date() > new Date(endDate)) {
    locationValue = (
      <p>
        <b>{locationLabel} :</b> Event has ended
      </p>
    );
  } else if (eventMode === "Online") {
    if (role == 3 || exploreEvent) {
      locationValue = isRegistered ? (
        <p>
          <b>{locationLabel} :</b>{" "}
          <a style={{ color: "white" }} href={link}>
            {link}
          </a>
        </p>
      ) : (
        "Please register for the link."
      );
    } else {
      locationValue = (
        <p>
          <b>{locationLabel} :</b>{" "}
          <a style={{ color: "white" }} href={link}>
            {link}
          </a>
        </p>
      );
    }
  } else {
    locationValue = (
      <p>
        <b>{locationLabel} : </b>
        {location}
      </p>
    );
  }

  return (
    <div className={`${styles["eventsdescription-container"]}`}>
      <div className={`${styles["eventsdescription-topleft"]}`}>
        <div className={`${styles["eventsdescription-navbutton"]}`}>
          <div>
            <NavButton pageName={eventTitle} />
          </div>
        </div>
      </div>

      <div className={`${styles["eventsdescription-description"]}`}>
        <div className={`${styles["eventsdescription-buttondiv"]}`}>
          <div className={`${styles["eventsdescription-buttondiv2"]}`}>
            <div className={`${styles["eventsdescription-content"]}`}>
              <div>
                <h2 className={`${styles["eventsdescription-contentheading"]}`}>
                  {eventTitle}
                </h2>
              </div>
              <div className={`${styles["eventsdescription-texted"]}`}>
                <a className={`${styles["eventsdescription-text"]}`}>
                  Type : {eventType}
                </a>
                <a className={`${styles["eventsdescription-texts"]}`}>
                  Event Mode : {eventMode}
                </a>
              </div>
            </div>

            {type === "public" && showButton && (
              <>
                <div className={`${styles["eventsdescription-primarydiv"]}`}>
                  <div
                    className={`${styles["eventsdescription-primarybutton"]}`}
                  >
                    <div>
                      <PrimaryButton
                        content={smaller}
                        variant="secondary"
                        onClick={onclick1}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {type === "mentor" && showButton && (
              <>
                <div className={`${styles["eventsdescription-primarydiv"]}`}>
                  <div
                    className={`${styles["eventsdescription-primarybutton"]}`}
                  >
                    <div>
                      <PrimaryButton
                        content={small}
                        variant="secondary"
                        onClick={onclick1}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {type === "admin" && (
              <>
                <div>
                  <div className={`${styles["eventsdescription-primarydiv"]}`}>
                    <PrimaryButton
                      content={large}
                      variant="reset"
                      onClick={onclick1}
                    />
                    <PrimaryButton
                      content={medium}
                      variant="reset"
                      onClick={onclick2}
                    />
                    <PrimaryButton
                      content={small}
                      variant="reset"
                      onClick={onclick3}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={`${styles["eventsdescription-gap"]}`}>
            <div className={`${styles["eventsdescription-headingcontent"]}`}>
              <h3>Description</h3>
            </div>
            <div className={`${styles["eventsdescription-desc"]}`}>
              <p>{description}</p>
            </div>
          </div>

          <div className={`${styles["eventsdescription-align"]}`}>
            <div className={`${styles["eventsdescription-gap"]}`}>
              <div className={`${styles["eventsdescription-headingcontent"]}`}>
                <h3>Date and Time</h3>
              </div>
              <div className={`${styles["eventsdescription-timer"]}`}>
                <a className={`${styles["eventsdescription-date"]}`}>
                  <b>Date : </b>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </a>
                <a className={`${styles["eventsdescription-time"]}`}>
                  <b>Time : </b>
                  {formatTime(startTime)} - {formatTime(endTime)}
                </a>
              </div>
            </div>

            <div className={`${styles["eventsdescription-gap"]}`}>
              <div className={`${styles["eventsdescription-headingcontent"]}`}>
                <h3>{locationLabel}</h3>
              </div>
              <div className={`${styles["eventsdescription-timer"]}`}>
                <a className={`${styles["eventsdescription-venue"]}`}>
                  {locationValue}
                </a>
              </div>
            </div>
          </div>

          <div className={`${styles["eventsdescription-gap"]}`}>
            <div className={`${styles["eventsdescription-headingcontent"]}`}>
              <h3>Speakers</h3>
            </div>
            <div>
              {speakers.length > 0 ? (
                speakers.map((speaker, index) => (
                  <p key={index} className={`${styles["eventsdescription-speaker"]}`}>
                    <b>{speaker.name},</b> {speaker.description}
                  </p>
                ))
              ) : (
                <p className="nodata">No speakers available</p>
              )}
            </div>
          </div>

          {(type === "public" || type === "admin") && (
            <>
                <div className={`${styles["eventsdescription-gap"]}`}>
                  <div
                    className={`${styles["eventsdescription-headingcontent"]}`}
                  >
                    <h3>Organizer</h3>
                  </div>

                  <div>
                    <a className={`${styles["eventsdescription-speaker"]}`}>
                      {organizer}
                    </a>
                  </div>
                </div>
            </>
          )}
          {(type === "admin") && (
            <>
              <div className={`${styles["eventsdescription-gap"]}`}>
                <div
                  className={`${styles["eventsdescription-headingcontent"]}`}
                >
                  <h3>Attendance</h3>
                </div>

                <div>
                  <a className={`${styles["eventsdescription-speaker"]}`}>
                    <b>Percentage : </b>
                    {percentage}
                    <br />
                    <b>Attendance Count : </b>
                    {fraction}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsDescription;
