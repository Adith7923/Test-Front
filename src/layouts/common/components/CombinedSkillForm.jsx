import React from "react";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import styles from "../../common/Common.module.css";

const CombinedSkillForm = ({
  mainHeading,
  isSelect,
  isEditlevel,
  message,
  skillName,
  displaytext,
  buttonTitle,
  options,
  initialData,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${styles["combinedskillform-form"]}`}
    >
      <div className={`${styles["combinedskillform-containerone"]}`}>
        <div className={`${styles["combinedskillform-allheading"]}`}>
          <header className={`${styles["combinedskillform-head"]}`}>
            {mainHeading}
          </header>
          {isEditlevel && !isSelect && message && skillName && (
            <p className={`${styles["combinedskillform-message"]}`}>
              {message}{" "}
              <span className={`${styles["combinedskillform-skillname"]}`}>
                {skillName}
              </span>
            </p>
          )}
        </div>
        <div className={`${styles["combinedskillform-containerinput"]}`}>
          {isSelect ? (
            <>
              <Controller
                name="skill"
                control={control}
                rules={{
                  required: "Skill name is required",
                }}
                render={({ field }) => (
                  <InputDropdown
                    {...field}
                    label="Select Skills"
                    placeholder="Skills"
                    options={options}
                    onBlur={() => handleBlur("skill")}
                  />
                )}
              />
              {errors.skill && (
                <p className={`${styles["combinedskillform-error"]}`}>
                  {errors.skill.message}
                </p>
              )}
              <div className={`${styles["combinedskillform-text"]}`}>
                {displaytext}
              </div>
            </>
          ) : isEditlevel ? (
            <Controller
              name="selectedLevel"
              control={control}
              render={({ field }) => (
                <InputDropdown
                  {...field}
                  label="Level"
                  placeholder="Select Level"
                  options={[{ value: 1, label: "Level 1" }]}
                  onBlur={() => handleBlur("selectedLevel")}
                />
              )}
            />
          ) : (
            <>
              <Controller
                name="selectedSkills"
                control={control}
                rules={{
                  required: "Skill name is required",
                }}
                render={({ field }) => (
                  <InputDropdown
                    {...field}
                    label="Select Skills"
                    placeholder="Select Your Skill"
                    options={options}
                    onBlur={() => handleBlur("selectedSkills")}
                  />
                )}
              />
              {errors.selectedSkills && (
                <p className={`${styles["combinedskillform-error"]}`}>
                  {errors.selectedSkills.message}
                </p>
              )}
              <Controller
                name="selectedLevel"
                control={control}
                rules={{
                  required: "Level is required",
                }}
                render={({ field }) => (
                  <InputDropdown
                    {...field}
                    label="Level"
                    placeholder="Select Level"
                    options={[{ value: 1, label: "Level 1" }]}
                    onBlur={() => handleBlur("selectedLevel")}
                  />
                )}
              />
              {errors.selectedLevel && (
                <p className={`${styles["combinedskillform-error"]}`}>
                  {errors.selectedLevel.message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className={`${styles["combinedskillform-buttoncontainer"]}`}>
        <PrimaryButton variant="primary" content={buttonTitle} width="full" />
      </div>
    </form>
  );
};

export default CombinedSkillForm;
