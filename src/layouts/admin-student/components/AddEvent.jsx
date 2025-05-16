import React from "react";
import styles from "../AdminStudent.module.css";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";

const AddEvent = ({ mainHeading, options, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const dropdownOptions = options.length > 0 ? options : [{ value: '', label: 'no events to display' }];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${styles["addevent-form"]}`}
    >
      <div className={`${styles["addevent-containerone"]}`}>
        <header className={`${styles["addevent-head"]}`}>{mainHeading}</header>
        <div className={`${styles["addevent-containerinput"]}`}>
          <Controller
            name="selectedEventId"
            control={control}
            rules={{
              required: options.length > 0 ? "Event ID is required" : false,
            }}
            render={({ field }) => (
              <InputDropdown
                {...field}
                label="Select Event(s)"
                placeholder="Event ID-Event Name"
                options={dropdownOptions}
                isDisabled={options.length === 0} 
              />
            )}
          />
          {errors.selectedEventId && (
            <p className={`${styles["addevent-error"]}`}>
              {errors.selectedEventId.message}
            </p>
          )}
        </div>
      </div>
      <div className={`${styles["addevent-buttoncontainer"]}`}>
        <PrimaryButton variant="primary" content="Add" width="full" />
      </div>
    </form>
  );
};

export default AddEvent;
