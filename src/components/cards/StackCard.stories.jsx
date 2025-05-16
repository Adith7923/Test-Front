import React from 'react';
import StackCard from './StackCard';

export default {
  title: 'Components/StackCard',
  component: StackCard,
  argTypes: {
    content: { control: 'text' },
  },
};

const Template = (args) => <StackCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: 'CSS',
};

