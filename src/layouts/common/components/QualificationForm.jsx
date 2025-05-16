import React, { useEffect, useRef} from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../components/inputbox/InputBox";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import styles from "../Common.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { isAfter } from "date-fns";
import {
  validateStartDate,
  validateEndDate,
  validateNumber,
  validateAndCleanInput,
} from "./validation";

const QualificationForm = ({ heading, options, initialValues, onSubmit }) => {
  const today = new Date();
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: initialValues,
  });

  const degreeRef = useRef(null);

  useEffect(() => {
    if (degreeRef.current) {
      degreeRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Start Date:", data.startDate);
    console.log("End Date:", data.endDate);
    onSubmit(data);
  };

  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  const validateStartDateBeforeToday = (value) => {
    return (
      isAfter(today, new Date(value)) || "Start Date should be before today"
    );
  };

  return (
    <form
      className={`${styles["qualification-form-form"]}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <header className={`${styles["qualification-form-head"]}`}>
        {heading}
      </header>
      <Controller
        name="degree"
        control={control}
        rules={{
          required: "Degree is required",
        }}
        render={({ field }) => (
          <InputDropdown
            {...field}
            ref={degreeRef}
            label="Degree of Education"
            placeholder="Select Degree"
            options={options}
            onBlur={() => handleBlur("degree")}
          />
        )}
      />
      {errors.degree && (
        <p className={`${styles["qualification-form-error"]}`}>
          {errors.degree.message}
        </p>
      )}
      <Controller
        name="specialization"
        control={control}
        rules={{
          required: "Specialization is required",
          validate: validateAndCleanInput,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Specialization"
            placeholders={["Specialization"]}
            size="normal"
            onBlur={() => handleBlur("specialization")}
          />
        )}
      />
      {errors.specialization && (
        <p className={`${styles["qualification-form-error"]}`}>
          {errors.specialization.message}
        </p>
      )}
      <Controller
        name="institution"
        control={control}
        rules={{
          required: "Institution / University is required",
          validate: validateAndCleanInput,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Institution / University"
            placeholders={["University"]}
            size="normal"
            onBlur={() => handleBlur("institution")}
          />
        )}
      />
      {errors.institution && (
        <p className={`${styles["qualification-form-error"]}`}>
          {errors.institution.message}
        </p>
      )}
      <Controller
        name="percentage"
        control={control}
        rules={{
          required: "Percentage is required ",
          validate: validateNumber("others"),
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Percentage"
            placeholders={["Percentage"]}
            size="normal"
            onBlur={() => handleBlur("percentage")}
          />
        )}
      />
      {errors.percentage && (
        <p className={`${styles["qualification-form-error"]}`}>
          {errors.percentage.message}
        </p>
      )}
      <div className={`${styles["qualification-form-startdate-enddate"]}`}>
        <div className={`${styles["qualification-form-datebox"]}`}>
          <Controller
            name="startDate"
            control={control}
            rules={{
              validate: validateStartDateBeforeToday,
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Start Date"
                size="normal"
                placeholders={["yyyy-mm-dd"]}
                isDatePicker
                onBlur={() => handleBlur("startDate")}
              />
            )}
          />
          {errors.startDate && (
            <p className={`${styles["qualification-form-error"]}`}>
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div className={`${styles["qualification-form-datebox"]}`}>
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
                placeholders={["yyyy-mm-dd"]}
                isDatePicker
                onBlur={() => handleBlur("endDate")}
              />
            )}
          />
          {errors.endDate && (
            <p className={`${styles["qualification-form-error"]}`}>
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>
      <div className={`${styles["qualification-form-button"]}`}>
        <PrimaryButton variant="primary" content="Save" width="full" />
      </div>
    </form>
  );
};

export default QualificationForm;
