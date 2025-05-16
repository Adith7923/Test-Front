import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../../components/inputbox/InputBox";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import styles from "../MentorEvents.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import NavButton from "../../../components/buttons/NavButton";
import {
  validateURL,
  validateStartDate,
  validateEndDate,
  validateAndCleanInput,
} from "../../common/components/validation";
import TextButton from "../../../components/buttons/TextButton";
import { MdEdit, MdDelete } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { FiMinusCircle } from "react-icons/fi";
const EventForm = ({ hostId, onSubmit }) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      eventTitle: "",
      eventMode: "",
      eventType: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      speakers: [{ name: "", description: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "speakers",
  });

  const [eventMode, setEventMode] = useState("Offline");

  const onSubmitForm = async (data) => {
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

    const formData = {
      eventTitle: data.eventTitle,
      hostId: hostId,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      link: data.link,
      eventType: data.eventType,
      speakers: data.speakers,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      eventMode: data.eventMode,
      organizer: hostId,
    };

    console.log("Form Data:", formData);
    try {
      await onSubmit(formData);
      handleToastMessage("Event created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  const handleToastMessage = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
  };

  useEffect(() => {
    if (selectedEventMode === "Online") {
      setValue("location", "");
    }
  }, [selectedEventMode, setValue]);

  const typeoptions = [
    { value: "Hackathon", label: "Hackathon" },
    { value: "Workshop", label: "Workshop" },
    { value: "Session", label: "Session" },
    { value: "Conference", label: "Conference" },
    { value: "Contest", label: "Contest" },
    { value: "Webinar", label: "Webinar" },
  ];

  const eventTitleRef = useRef(null);

  useEffect(() => {
    if (eventTitleRef.current){
      eventTitleRef.current.focus();
    }
  },[]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={`${styles["eventform-form"]} padding padding-top padding-bottom`}
      >
        <NavButton pageName="Create Event" onClick={() => {}} />
        <div className={`${styles["eventform-eventtitlemode"]}`}>
          <div className={`${styles["eventform-eventtitlediv"]}`}>
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
                  className={`${styles["eventform-eventtitle"]}`}
                  onBlur={() => handleBlur("eventTitle")}
                />
              )}
            />
            {errors.eventTitle && (
              <p className={`${styles["eventform-error"]}`}>
                {errors.eventTitle.message}
              </p>
            )}
          </div>

          <div className={`${styles["eventform-eventmodediv"]}`}>
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
                  className={`${styles["eventform-eventmode"]}`}
                  onBlur={() => handleBlur("eventMode")}
                />
              )}
            />
            {errors.eventMode && (
              <p className={`${styles["eventform-error"]}`}>
                {errors.eventMode.message}
              </p>
            )}
          </div>
        </div>

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
              placeholder={["Event Type"]}
              options={typeoptions}
              className={`${styles["eventform-eventtype"]}`}
              onBlur={() => handleBlur("eventType")}
            />
          )}
        />
        {errors.eventType && (
          <p className={`${styles["eventform-error"]}`}>
            {errors.eventType.message}
          </p>
        )}

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
              className={`${styles["eventform-description"]}`}
              onBlur={() => handleBlur("description")}
            />
          )}
        />
        {errors.description && (
          <p className={`${styles["eventform-error"]}`}>
            {errors.description.message}
          </p>
        )}

        <div className={`${styles["eventform-datetimecontainer"]}`}>
          <div className={`${styles["eventform-datetime"]}`}>
            <Controller
              name="startDate"
              control={control}
              rules={{
                validate: validateStartDate("new"),
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Start Date"
                  size="normal"
                  placeholders={["dd/mm/yyyy"]}
                  className={`${styles["eventform-startdate"]}`}
                  isDatePicker
                  onBlur={() => handleBlur("startDate")}
                />
              )}
            />
            {errors.startDate && (
              <p className={`${styles["eventform-error"]}`}>
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div className={`${styles["eventform-datetime"]}`}>
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
                  className={`${styles["eventform-enddate"]}`}
                  isDatePicker
                  onBlur={() => handleBlur("endDate")}
                />
              )}
            />
            {errors.endDate && (
              <p className={`${styles["eventform-error"]}`}>
                {errors.endDate.message}
              </p>
            )}
          </div>

          <div className={`${styles["eventform-datetime"]}`}>
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
                  className={`${styles["eventform-starttime"]}`}
                  isTimePicker
                  onBlur={() => handleBlur("startTime")}
                />
              )}
            />
            {errors.startTime && (
              <p className={`${styles["eventform-error"]}`}>
                {errors.startTime.message}
              </p>
            )}
          </div>

          <div className={`${styles["eventform-datetime"]}`}>
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
                  className={`${styles["eventform-endtime"]}`}
                  isTimePicker
                  onBlur={() => handleBlur("endTime")}
                />
              )}
            />
            {errors.endTime && (
              <p className={`${styles["eventform-error"]}`}>
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

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
              className={`${styles["eventform-location"]}`}
              onBlur={() => handleBlur("location")}
            />
          )}
        />
        {errors.location && (
          <p className={`${styles["eventform-error"]}`}>
            {errors.location.message}
          </p>
        )}
        <div className={`${styles["eventform-speakerscontainer"]} `}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`${styles["eventform-speaker-pair"]}`}
            >
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
                      label={
                        fields.length > 1 ? `Speaker ${index + 1}` : "Speaker"
                      }
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
                      label={
                        fields.length > 1
                          ? `Speaker Description ${index + 1}`
                          : "Speaker Description"
                      }
                      size="normal"
                      placeholders={["Speaker Description"]}
                      className={`${styles["eventform-speakerdescription"]}`}
                      onBlur={() =>
                        handleBlur(`speakers[${index}].description`)
                      }
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
        <div className={`${styles["eventform-buttondiv"]}`}>
          <div className={`${styles["eventform-buttoncontainer"]}`}>
            <PrimaryButton
              content="Submit"
              variant="primary"
              width="full"
              className={`${styles["eventform-submitbutton"]}`}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
