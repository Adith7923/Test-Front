import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "../Common.module.css";
import Input from "../../../components/inputbox/InputBox";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import {
  validateAndCleanInput,
  validateEmail,
} from "../../common/components/validation";

const AddUser = ({
  options,
  viewCollege,
  heading,
  onSubmit,
  submitError = "",
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm();

  const firstNameRef = useRef(null);

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className={`${styles["adduser-container"]}`}>
      <div className={`${styles["adduser-head"]}`}>{heading}</div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`${styles["adduser-form"]}`}
      >
        <div className={`${styles["adduser-field"]}`}>
          <div className={`${styles["adduser-name"]}`}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First name is required",
                validate: validateAndCleanInput,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  ref={firstNameRef}
                  label="Enter Full Name"
                  size="normal"
                  placeholders={["First Name"]}
                  onBlur={() => handleBlur("firstName")}
                />
              )}
            />
            {errors.firstName && (
              <p className={`${styles["adduser-error"]}`}>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className={`${styles["adduser-name"]}`}>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Second name is required",
                validate: validateAndCleanInput,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="normal"
                  placeholders={["Second Name"]}
                  onBlur={() => handleBlur("lastName")}
                />
              )}
            />
            {errors.lastName && (
              <p className={`${styles["adduser-error"]}`}>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <Controller
          name="emailId"
          control={control}
          rules={{
            required: "Email is required",
            validate: validateEmail,
          }}
          render={({ field }) => (
            <Input
              {...field}
              label="Enter Email ID"
              size="normal"
              placeholders={["Email ID"]}
              onBlur={() => handleBlur("emailId")}
            />
          )}
        />
        {(errors.emailId || submitError) && (
          <p className={`${styles["adduser-error"]}`}>
            {errors.emailId ? errors.emailId.message : submitError}
          </p>
        )}
        {viewCollege && (
          <Controller
            name="collegeId"
            control={control}
            rules={{
              required: "College name is required",
            }}
            render={({ field }) => (
              <InputDropdown
                {...field}
                label="Select College"
                size="normal"
                placeholders={["Select College"]}
                options={options}
                onBlur={() => handleBlur("collegeId")}
              />
            )}
          />
        )}
        {errors.collegeId && (
          <p className={`${styles["adduser-error"]}`}>
            {errors.collegeId.message}
          </p>
        )}
        <PrimaryButton
          type="submit"
          content="Add"
          variant="primary"
          width="full"
        />
      </form>
    </div>
  );
};

export default AddUser;
