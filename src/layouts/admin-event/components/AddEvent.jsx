import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Input from "../../../components/inputbox/InputBox";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import styles from "../AdminEvent.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import {
  validateURL,
  validateStartDate,
  validateEndDate,
  validateAndCleanInput,
} from "../../common/components/validation";
import TextButton from "../../../components/buttons/TextButton";
import { GoPlusCircle } from "react-icons/go";
import { FiMinusCircle } from "react-icons/fi";

const AddEvent = ({
  defaultValues,
  organizeroptions,
  onSubmit,
  isOrganizer,
  fetchedFormData,
}) => {
  const mergedDefaultValues = {
    ...fetchedFormData,
    speakers: fetchedFormData?.speakers || [{ name: "", description: "" }],
    hostId: fetchedFormData?.hostId || "",
  };

  const eventtypeoptions = [
    { value: "Hackathon", label: "Hackathon" },
    { value: "Workshop", label: "Workshop" },
    { value: "Session", label: "Session" },
    { value: "Conference", label: "Conference" },
    { value: "Contest", label: "Contest" },
    { value: "Webinar", label: "Webinar" },
  ];

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      ...mergedDefaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "speakers",
  });

  const [eventMode, setEventMode] = useState(mergedDefaultValues.eventMode);

  const eventTitleRef = useRef(null);

  useEffect(() => {
    if (eventTitleRef.current) {
      eventTitleRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (data) => {
    const ensureFullTimeFormat = (time) => {
      return time && time.length === 5 ? `${time}:00` : time;
    };
    data.startTime = ensureFullTimeFormat(data.startTime);
    data.endTime = ensureFullTimeFormat(data.endTime);
    if (data.eventMode === "Online") {
      if (!data.location) {
        data.link = "";
      } else {
        data.link = data.location;
      }
      delete data.location;
    }
    if (!isOrganizer) {
      data.organizer = null;
    }
    console.log(data);
    onSubmit(data);
  };

  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  const options = [
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
  ];

  const selectedEventMode = watch("eventMode", eventMode);

  const handleEventModeChange = (selectedOption) => {
    const newValue = selectedOption.value;
    setEventMode(newValue);
    setValue("eventMode", newValue);

    if (newValue === "Online") {
      // setValue("location", mergedDefaultValues.link || "");
    } else {
      // setValue("location", mergedDefaultValues.location || "");
    }
  };

  useEffect(() => {
    if (!watch("location")) {
      // Added condition to prevent overwriting user input
      if (selectedEventMode === "Online") {
        setValue("location", mergedDefaultValues.link || "");
      } else {
        setValue("location", mergedDefaultValues.location || "");
      }
    }
  }, [selectedEventMode, setValue, mergedDefaultValues, watch]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${styles["addevent-form"]}`}
    >
      {/* Event Title and Mode */}
      <div className={`${styles["addevent-eventtitlemode"]}`}>
        <div className={`${styles["addevent-eventtitlediv"]}`}>
          <Controller
            name="eventTitle"
            control={control}
            rules={{
              required: "Event Title is required",
              validate: validateAndCleanInput,
            }}
            render={({ field }) => (
              <Input
                {...field}
                ref={eventTitleRef}
                label="Event Title"
                size="normal"
                placeholders={["Event Title"]}
                className={`${styles["addevent-eventtitle"]}`}
                onBlur={() => handleBlur("eventTitle")}
              />
            )}
          />
          {errors.eventTitle && (
            <p className={`${styles["addevent-error"]}`}>
              {errors.eventTitle.message}
            </p>
          )}
        </div>

        <div className={`${styles["addevent-eventmodediv"]}`}>
          <Controller
            name="eventMode"
            control={control}
            rules={{
              required: "Event Mode is required",
              validate: validateAndCleanInput,
            }}
            render={({ field }) => (
              <InputDropdown
                {...field}
                label="Event Mode"
                placeholder="Event Mode"
                options={options}
                className={`${styles["addevent-eventmode"]}`}
                onBlur={() => handleBlur("eventMode")}
              />
            )}
          />
          {errors.eventMode && (
            <p className={`${styles["addevent-error"]}`}>
              {errors.eventMode.message}
            </p>
          )}
        </div>
      </div>

      {/* Event Type */}
      <Controller
        name="eventType"
        control={control}
        rules={{
          required: "Event Type is required",
          validate: validateAndCleanInput,
        }}
        render={({ field }) => (
          <InputDropdown
            {...field}
            label="Event Type"
            size="normal"
            placeholders={["Event Type"]}
            options={eventtypeoptions}
            className={`${styles["addevent-eventtype"]}`}
            onBlur={() => handleBlur("eventType")}
          />
        )}
      />
      {errors.eventType && (
        <p className={`${styles["addevent-error"]}`}>
          {errors.eventType.message}
        </p>
      )}

      {/* Description */}
      <Controller
        name="description"
        control={control}
        rules={{
          required: "Description is required",
          validate: validateAndCleanInput,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Description"
            size="large"
            placeholders={["Description"]}
            className={`${styles["addevent-description"]}`}
            onBlur={() => handleBlur("description")}
          />
        )}
      />
      {errors.description && (
        <p className={`${styles["addevent-error"]}`}>
          {errors.description.message}
        </p>
      )}

      {/* Dates and Times */}
      <div className={`${styles["addevent-datetimecontainer"]}`}>
        <div className={`${styles["addevent-datetime"]}`}>
          <Controller
            name="startDate"
            control={control}
            rules={{
              validate: mergedDefaultValues.startDate
                ? validateStartDate("edit")
                : validateStartDate("new"),
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Start Date"
                size="normal"
                placeholders={["dd/mm/yyyy"]}
                className={`${styles["addevent-startdate"]}`}
                isDatePicker
                onBlur={() => handleBlur("startDate")}
              />
            )}
          />
          {errors.startDate && (
            <p className={`${styles["addevent-error"]}`}>
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className={`${styles["addevent-datetime"]}`}>
          <Controller
            name="endDate"
            control={control}
            rules={{
              validate: validateEndDate,
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="End Date"
                size="normal"
                placeholders={["dd/mm/yyyy"]}
                className={`${styles["addevent-enddate"]}`}
                isDatePicker
                onBlur={() => handleBlur("endDate")}
              />
            )}
          />
          {errors.endDate && (
            <p className={`${styles["addevent-error"]}`}>
              {errors.endDate.message}
            </p>
          )}
        </div>

        <div className={`${styles["addevent-datetime"]}`}>
          <Controller
            name="startTime"
            control={control}
            rules={{
              required: "Start Time is required",
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Start Time"
                size="normal"
                placeholders={["hh:mm:ss"]}
                className={`${styles["addevent-starttime"]}`}
                isTimePicker
                onBlur={() => handleBlur("startTime")}
              />
            )}
          />
          {errors.startTime && (
            <p className={`${styles["addevent-error"]}`}>
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div className={`${styles["addevent-datetime"]}`}>
          <Controller
            name="endTime"
            control={control}
            rules={{
              required: "End Time is required",
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="End Time"
                size="normal"
                placeholders={["hh:mm:ss"]}
                className={`${styles["addevent-endtime"]}`}
                isTimePicker
                onBlur={() => handleBlur("endTime")}
              />
            )}
          />
          {errors.endTime && (
            <p className={`${styles["addevent-error"]}`}>
              {errors.endTime.message}
            </p>
          )}
        </div>
      </div>

      {/* Location */}
      <Controller
        name="location"
        control={control}
        rules={{
          required:
            selectedEventMode === "Online"
              ? "Link is required"
              : "Location is required",
          validate:
            selectedEventMode === "Online"
              ? validateURL
              : validateAndCleanInput,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label={selectedEventMode === "Online" ? "Link" : "Location"}
            size="normal"
            placeholders={[
              selectedEventMode === "Online" ? "Link" : "Location",
            ]}
            className={`${styles["addevent-location"]}`}
            onBlur={() => handleBlur("location")}
          />
        )}
      />
      {errors.location && (
        <p className={`${styles["addevent-error"]}`}>
          {errors.location.message}
        </p>
      )}

      <div className={`${styles["eventform-speakerscontainer"]}`}>
        {fields.map((field, index) => (
          <div key={field.id} className={`${styles["eventform-speaker-pair"]}`}>
            <div className={`${styles["eventform-speaker"]}`}>
              <Controller
                name={`speakers[${index}].name`}
                control={control}
                rules={{
                  required: "Speaker Name is required",
                  validate: validateAndCleanInput,
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={`Speaker ${index + 1}`}
                    size="normal"
                    placeholders={["Speaker Name"]}
                    className={`${styles["eventform-speakername"]}`}
                    onBlur={() => handleBlur(`speakers[${index}].name`)}
                    icon={
                      fields.length > 1 && (
                        <FiMinusCircle
                          onClick={() => remove(index)}
                          className={`${styles["eventform-removeicon-final"]}`}
                        />
                      )
                    }
                  />
                )}
              />
              {errors.speakers?.[index]?.name && (
                <p className={`${styles["eventform-error-speaker"]}`}>
                  {errors.speakers[index].name.message}
                </p>
              )}
            </div>
            <div className={`${styles["eventform-speaker-description"]}`}>
              <Controller
                name={`speakers[${index}].description`}
                control={control}
                rules={{
                  required: "Speaker Description is required",
                  validate: validateAndCleanInput,
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={`Speaker Description ${index + 1}`}
                    size="normal"
                    placeholders={["Speaker Description"]}
                    className={`${styles["eventform-speakerdescription"]}`}
                    onBlur={() => handleBlur(`speakers[${index}].description`)}
                  />
                )}
              />
              {errors.speakers?.[index]?.description && (
                <p className={`${styles["eventform-error-speaker"]}`}>
                  {errors.speakers[index].description.message}
                </p>
              )}
            </div>
          </div>
        ))}

        <div className={`${styles["eventform-addspeaker-container"]}`}>
          <TextButton
            text="Add Speaker"
            icon={<GoPlusCircle />}
            className={`${styles["eventform-addspeaker"]}`}
            onClick={() => append({ name: "", description: "" })}
          />
        </div>
      </div>
      {errors.speakers && (
        <p className={`${styles["addevent-error"]}`}>
          {errors.speakers.message}
        </p>
      )}

      {/* Organizer Dropdown */}
      {isOrganizer && (
        <Controller
          name="hostId"
          control={control}
          rules={{
            required: "Organizer is required",
          }}
          render={({ field }) => (
            <InputDropdown
              {...field}
              label="Organizer"
              size="normal"
              placeholders={["Organizer"]}
              options={organizeroptions}
              className={`${styles["addevent-organizer"]}`}
              onBlur={() => handleBlur("hostId")}
            />
          )}
        />
      )}
      {errors.hostId && (
        <p className={`${styles["addevent-error"]}`}>{errors.hostId.message}</p>
      )}

      {/* Submit Button */}
      <PrimaryButton
        content="Submit"
        variant="primary"
        width="full"
        className={`${styles["addevent-submitbutton"]}`}
      />
    </form>
  );
};

export default AddEvent;
