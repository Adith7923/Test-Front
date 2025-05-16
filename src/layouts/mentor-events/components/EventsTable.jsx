import React, { useState, useEffect } from "react";
import styles from "../MentorEvents.module.css";
import Table from "../../../components/table/Table";
import AttendanceButton from "../../../components/buttons/AttendanceButton";
import TextButton from "../../../components/buttons/TextButton";
import { TfiExport } from "react-icons/tfi";

const EventsTable = (props) => {
  const { data, headings, onAttendanceUpdate, disableAttendance, eventName } = props;

  const [attendance, setAttendance] = useState(
    data.reduce((acc, [id, , , attendance]) => {
      acc[id] = attendance;
      return acc;
    }, {})
  );

  useEffect(() => {
    const newAttendance = data.reduce((acc, [id, , , newAttendance]) => {
      acc[id] = newAttendance;
      return acc;
    }, {});

    setAttendance(newAttendance);
  }, [data]);

  const handleAttendanceClick = (participantId, isPresent) => {
    if (disableAttendance) {
      console.log("Attendance marking is disabled for this event");
      return;
    }

    const updatedAttendance = {
      ...attendance,
      [participantId]: isPresent,
    };

    setAttendance(updatedAttendance);

    const requestBody = {
      participantId: participantId,
      attendance: isPresent,
    };

    if (onAttendanceUpdate) {
      onAttendanceUpdate(requestBody);
    }
  };

  const handleExportClick = () => {
    const csvData = [["Participant ID", "Name", "Username", "Attendance"]];
    data.forEach(([participantId, name, userName]) => {
      csvData.push([
        participantId,
        name,
        userName,
        attendance[participantId] ? "Present" : "Absent",
      ]);
    });

    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${eventName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalParticipants = data.length;
  const presentParticipants = totalParticipants ? Object.values(attendance).filter(isPresent => isPresent).length : 0;
  const attendancePercentage = totalParticipants ? Math.round((presentParticipants / totalParticipants) * 100) : 0;

  const tableData = data.map(([participantId, name, userName]) => [
    participantId,
    name,
    userName,
    <div style={{ display: "flex", width: "120px", gap: "2px" }} key={participantId}>
      <div title={disableAttendance ? "Event not completed" : ""}>
      <AttendanceButton
        content="Present"
        isActive={attendance[participantId] === true}
        onClick={() => handleAttendanceClick(participantId, true)}
        disabled={disableAttendance}
      />
      </div>
      <div title={disableAttendance ? "Event not completed" : ""}>
        <AttendanceButton
        content="Absent"
        isActive={attendance[participantId] === false}
        onClick={() => handleAttendanceClick(participantId, false)}
        disabled={disableAttendance}
      />
      </div>
    </div>,
  ]);
  return (
    <div className={`${styles["eventstable-container"]} padding padding-bottom`}>
      <div className={styles["eventstable-topleft"]}>
        <h2>Mark Attendance</h2> <h3>{`${presentParticipants}/${totalParticipants} Present`}</h3>
        <h3>{`${attendancePercentage}% Attendance`}</h3>
        <TextButton text="Export" icon={<TfiExport />} onClick={handleExportClick} />
      </div>
      <div className={styles["eventstable-table"]}>
        <div className={styles["eventstable-tablecontent"]}>
          <Table
            data={tableData}
            headings={headings.slice(0, 3).concat("Status")}
            noData={"No participants available"}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
