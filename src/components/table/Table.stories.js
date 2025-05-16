import React from "react";
import Table from "./Table";

export default {
  title: "components/Table",
  component: Table,
};

const Template = (args) => <Table {...args} />;

const data = [
  ["John", "Samual", 30],
  ["Jane", "Smith", 25],
  ["Alice", "Mary", 28],
  ["Meera", "Davis", 23],
  ["boby", "Smith", 25],
  ["Amala", "Jayadev", 27],
  ["Amal", "Wilson", 24],
];

const headings = ["First Name", "Last Name", "Age"];

export const TableComponent = Template.bind({});
TableComponent.args = {
  data,
  headings,
};
