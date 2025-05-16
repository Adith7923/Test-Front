import React, {useEffect,useRef} from "react";
import styles from "../Common.module.css";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import Input from "../../../components/inputbox/InputBox";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import { validateAndCleanInput } from "./validation";

const UpdateSingleField = ({
  mainHeading,
  labelTitle,
  placeHolder,
  buttonTitle,
  initialData,
  onSubmit,
  isSelect = false,
  options,
  message,
  skillId,
  isEdit,
  submitError = "",
}) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isSelect
      ? {
          studentIds: initialData?.studentIds || [],
        }
      : {
          inputData: initialData || "",
        },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const editSkillRef = useRef(null);

  useEffect(() => {
    if(editSkillRef.current){
      editSkillRef.current.focus();
    }
  },[]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles["addstudent-form"]}
    >
      <div className={`${styles["addstudent-containerone"]}`}>
        <div className={`${styles["addstudent-allheading"]}`}>
          <header className={`${styles["addstudent-head"]}`}>
            {mainHeading}
          </header>
          {isEdit && message && skillId && (
            <p className={`${styles["addstudent-message"]}`}>
              {message}{" "}
              <span className={`${styles["addstudent-skillname"]}`}>
                {skillId}
              </span>
            </p>
          )}
        </div>
        <div className={`${styles["addstudent-containerinput"]}`}>
          {isSelect ? (
            <>
              <Controller
                name="studentIds"
                control={control}
                rules={{ required: "Student ID is required" }}
                render={({ field }) => (
                  <InputDropdown
                    label="Student Name/ID"
                    placeholder="Student Name/ID"
                    options={options}
                    isMulti={true}
                    {...field}
                  />
                )}
              />
              {errors.studentIds && (
                <p className={`${styles["addstudent-error"]}`}>
                  {errors.studentIds.message}
                </p>
              )}
            </>
          ) : (
            <>
              <Controller
                name="inputData"
                control={control}
                rules={{
                  required: "Field is required",
                  validate: validateAndCleanInput,
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    ref={editSkillRef}
                    label={labelTitle}
                    placeholders={[placeHolder]}
                    size="normal"
                  />
                )}
              />

              {(errors.inputData || submitError) && (
                <p className={`${styles["addstudent-error"]}`}>
                  {errors.inputData ? errors.inputData.message : submitError}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles["addstudent-buttoncontainer"]}>
        <PrimaryButton variant="primary" content={buttonTitle} width="full" />
      </div>
    </form>
  );
};

export default UpdateSingleField;
