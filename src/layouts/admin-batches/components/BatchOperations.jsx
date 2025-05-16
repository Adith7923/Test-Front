import React, { useEffect, useRef } from "react";
import styles from "../AdminBatches.module.css";
import Input from "../../../components/inputbox/InputBox";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useForm, Controller } from "react-hook-form";
import { validateAndCleanInput } from "../../common/components/validation";

const BatchOperations = ({ mainHeading, onSubmit, submitError, options }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      batchName: "",
      studentIds: [],
    },
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  const batchNameRef = useRef(null);

  useEffect(() => {
    if (batchNameRef.current){
      batchNameRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${styles["batchoperations-form"]}`}
    >
      <div className={`${styles["batchoperations-containerone"]}`}>
        <header className={`${styles["batchoperations-head"]}`}>
          {mainHeading}
        </header>
        <div className={`${styles["batchoperations-containerinput"]}`}>
          <Controller
            name="batchName"
            control={control}
            rules={{
              required: "Batch Name is required",
              validate: validateAndCleanInput,
            }}
            render={({ field }) => (
              <Input
                {...field}
                ref={batchNameRef}
                label="Enter Batch Name"
                placeholders={["Batch Name"]}
                size="normal"
              />
            )}
          />
          {(errors.batchName || submitError) && (
            <p className={`${styles["batchoperations-error"]}`}>
              {errors.batchName ? errors.batchName.message : submitError}
            </p>
          )}

          {/*Input dropdown omitted temporarily*/}

          {/* <Controller
            name="studentIds"
            control={control}
            rules={{ required: "Student ID is required" }}
            render={({ field }) => (
              <InputDropdown
                label="Student ID(s)"
                placeholder="Student ID"
                options={options}
                isMulti={true}
                {...field}
              />
            )}
          />
          {errors.studentIds && (
            <p className={`${styles["batchoperations-error"]}`}>
              {errors.studentIds.message}
            </p>
          )} */}
        </div>
      </div>
      <div className={`${styles["batchoperations-buttoncontainer"]}`}>
        <PrimaryButton
          type="submit"
          variant="primary"
          content="Create Batch"
          width="full"
        />
      </div>
    </form>
  );
};

export default BatchOperations;
