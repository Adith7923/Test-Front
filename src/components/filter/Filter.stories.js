import React, {useState} from 'react';
import { action } from '@storybook/addon-actions';
import Filter from "./Filter";

export default {
  title: "components/Filters",
  component: Filter,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(args.initialHeading);

  const handleToggle = (state) => {
    setIsOpen(state !== undefined ? state : !isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Filter
      {...args}
      initialHeading={selectedOption}
      isOpen={isOpen}
      onToggle={handleToggle}
      onOptionClick={handleOptionClick}
    />
  );
};

export const filter = Template.bind({});
filter.args = {
  initialHeading: "Batch",
  Content: ["Batch 1", "Batch 2", "Batch 3"],
};
