import React, { useState, useEffect, useRef } from "react";
import styles from "../../common/Common.module.css";
import { useForm, Controller } from "react-hook-form";
import { subDays, format } from "date-fns";
import Input from "../../../components/inputbox/InputBox";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import TextButton from "../../../components/buttons/TextButton";
import { FaPlus, FaMinus } from "react-icons/fa6";
import {
  validateImageFile,
  validatePhone,
  validateURL,
  validateNumber,
  validateAndCleanInput,
  validateCountry,
  validateState,
} from "./validation";

const BasicDetails = ({ mainHeading, initialData, isEdit, onSubmit }) => {
  const today = new Date();
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: initialData,
  });
  const isvisible = false;
  const [fileError, setFileError] = useState("");
  const [showProfileLinks, setShowProfileLinks] = useState(isEdit);

  useEffect(() => {
    setShowProfileLinks(isEdit);
  }, [isEdit]);

  const dobRef = useRef(null);

  useEffect(() => {
    if (dobRef.current) {
      dobRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (data) => {
    if (fileError) {
      return;
    }
    onSubmit(data);
    console.log(data);
  };

  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  const handleTextButtonClick = () => {
    setShowProfileLinks(!showProfileLinks);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${styles["basicdetails-form"]}`}
    >
      <div className={`${styles["basicdetails-containerone"]}`}>
        <header className={`${styles["basicdetails-head"]}`}>
          {mainHeading}
        </header>
        <div className={`${styles["basicdetails-containerinput-out"]}`}>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                ref={dobRef}
                label="Date of Birth"
                size="normal"
                placeholders={["yyyy-mm-dd"]}
                isDatePicker
                onBlur={() => handleBlur("dob")}
              />
            )}
          />
          {errors.dob && (
            <p className={`${styles["basicdetails-error"]}`}>
              {errors.dob.message}
            </p>
          )}
          <Controller
            name="phoneNo"
            control={control}
            rules={{ validate: validatePhone }}
            render={({ field }) => (
              <Input
                {...field}
                label="Phone Number"
                placeholders={["Phone Number"]}
                size="normal"
                onBlur={() => handleBlur("phoneNo")}
              />
            )}
          />
          {errors.phoneNo && (
            <p className={`${styles["basicdetails-error"]}`}>
              {errors.phoneNo.message}
            </p>
          )}
          {isvisible && (
            <Controller
              name="profilePhoto"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Profile Photo"
                  placeholders={["Profile Photo"]}
                  size="normal"
                  isFileInput="true"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (validateImageFile(file, setFileError, setError)) {
                      setValue("profilePhoto", file);
                    } else {
                      setValue("profilePhoto", null);
                    }
                  }}
                />
              )}
            />
          )}
          {fileError && (
            <p className={`${styles["basicdetails-error"]}`}>{fileError}</p>
          )}
          {isvisible && (
            <div className={`${styles["basicdetails-icontext"]}`}>
              <TextButton
                icon={showProfileLinks ? <FaMinus /> : <FaPlus />}
                text={
                  showProfileLinks ? "Close Profile Links" : "Add Profile Links"
                }
                onClick={handleTextButtonClick}
              />
            </div>
          )}
        </div>
        {isvisible && showProfileLinks && (
          <div className={`${styles["basicdetails-containerinput-links"]}`}>
            <div className={`${styles["basicdetails-links"]}`}>
              <Controller
                name="githubLink"
                control={control}
                rules={{ validate: validateURL }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="GitHub Link"
                    placeholders={["Link"]}
                    size="normal"
                  />
                )}
              />
              {errors.githubLink && (
                <p className={`${styles["basicdetails-error"]}`}>
                  {errors.githubLink.message}
                </p>
              )}
            </div>
            <div className={`${styles["basicdetails-links"]}`}>
              <Controller
                name="linkedinLink"
                control={control}
                rules={{ validate: validateURL }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="LinkedIn Link"
                    placeholders={["Link"]}
                    size="normal"
                  />
                )}
              />
              {errors.linkedinLink && (
                <p className={`${styles["basicdetails-error"]}`}>
                  {errors.linkedinLink.message}
                </p>
              )}
            </div>
            <div className={`${styles["basicdetails-links"]}`}>
              <Controller
                name="otherLink"
                control={control}
                rules={{ validate: validateURL }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Other Link"
                    placeholders={["Link"]}
                    size="normal"
                  />
                )}
              />
              {errors.otherLink && (
                <p className={`${styles["basicdetails-error"]}`}>
                  {errors.otherLink.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={`${styles["basicdetails-containerinput-inter"]}`}>
        <Controller
          name="addresses[0].houseName"
          rules={{ validate: validateAndCleanInput }}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Address"
              placeholders={["House Name"]}
              size="normal"
              onBlur={() => handleBlur("addresses[0].houseName")}
            />
          )}
        />
        {errors.addresses?.[0]?.houseName && (
          <p className={`${styles["basicdetails-error"]}`}>
            {errors.addresses[0].houseName.message}
          </p>
        )}
        <Controller
          name="addresses[0].city"
          control={control}
          rules={{ validate: validateAndCleanInput }}
          render={({ field }) => (
            <Input
              {...field}
              placeholders={["City"]}
              size="normal"
              onBlur={() => handleBlur("addresses[0].city")}
            />
          )}
        />
        {errors.addresses?.[0]?.city && (
          <p className={`${styles["basicdetails-error"]}`}>
            {errors.addresses[0].city.message}
          </p>
        )}
        <Controller
          name="addresses[0].pinCode"
          control={control}
          rules={{ validate: validateNumber("postalCode") }}
          render={({ field }) => (
            <Input
              {...field}
              placeholders={["Pincode"]}
              size="normal"
              onBlur={() => handleBlur("addresses[0].pinCode")}
            />
          )}
        />
        {errors.addresses?.[0]?.pinCode && (
          <p className={`${styles["basicdetails-error"]}`}>
            {errors.addresses[0].pinCode.message}
          </p>
        )}
        <Controller
          name="addresses[0].state"
          rules={{ validate: { validateState, validateAndCleanInput } }}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholders={["State"]}
              size="normal"
              onBlur={() => handleBlur("addresses[0].state")}
            />
          )}
        />
        {errors.addresses?.[0]?.state && (
          <p className={`${styles["basicdetails-error"]}`}>
            {errors.addresses[0].state.message}
          </p>
        )}
        <Controller
          name="addresses[0].country"
          rules={{ validate: validateCountry }}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholders={["Country"]}
              size="normal"
              onBlur={() => handleBlur("addresses[0].country")}
            />
          )}
        />
        {errors.addresses?.[0]?.country && (
          <p className={`${styles["basicdetails-error"]}`}>
            {errors.addresses[0].country.message}
          </p>
        )}
        <div className={`${styles["basicdetails-containerinput-in"]}`}>
          <Controller
            name="aboutMe"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="About Me"
                placeholders={["About Me"]}
                size="large"
                onBlur={() => handleBlur("aboutMe")}
              />
            )}
          />
          <div className={`${styles["basicdetails-buttoncontainer"]}`}>
            <PrimaryButton variant="primary" content="Save" width="full" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicDetails;
