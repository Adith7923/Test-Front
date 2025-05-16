import Paginations from "./Pagination";

export default {
  title: "components/Paginations",
  component: Paginations,
};

const pageData = {
  currentPage: 7,
  totalPages: 10,
  onPageChange: (e) => {
    console.log("Page Changed");
  },
};

export const Pagination = {
  args: {
    ...pageData,
  },
};
