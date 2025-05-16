import React from 'react';
import NoData from './NoData';

export default {
  title: 'Components/NoData',
  component: NoData,
};

const Template = (args) => <NoData {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Data',
};

export const NoColleges = Template.bind({});
NoColleges.args = {
  title: 'Colleges',
};

export const NoStudents = Template.bind({});
NoStudents.args = {
  title: 'Students',
};
