import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import Pagination from "../../../components/pagination/Pagination";
import styles from "../Common.module.css";
import { PiCards, PiListBullets } from "react-icons/pi";
import TextButton from "../../../components/buttons/TextButton";

const DataView = ({
  cardType = "Primarycard",
  CardComponent,
  data = [],
  tableColumns = [],
  toggle,
  itemsPerPage = 15,
  viewInactive = false,
  viewInactiveText = "View Inactive",
  onViewInactiveClick = () => {},
}) => {
  const [isCardView, setIsCardView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileItemsPerPage, setMobileItemsPerPage] = useState(5);

  const getItemsPerPage = () =>
    isMobileView ? mobileItemsPerPage : itemsPerPage;

  const totalPages = Math.ceil((data?.length || 0) / getItemsPerPage());

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const showCardView = () => {
    setIsCardView(true);
  };

  const showTableView = () => {
    setIsCardView(false);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = data
    ? data.slice(
        (currentPage - 1) * getItemsPerPage(),
        currentPage * getItemsPerPage()
      )
    : [];

  const getComponentName = (item) => {
    let cardName = String(CardComponent.name).toLowerCase();
    if (cardName === "undefined" || cardName === "cardcomponent") {
      cardName = cardType;
    }
    if (cardName === "skillbatchcard") {
      if (String(item.cardType).toLowerCase() === "skill") {
        cardName = "dataview-skillbatchcardskill";
      } else if (String(item.cardType).toLowerCase() === "batch") {
        cardName = "dataview-skillbatchcardbatch";
      }
    } else {
      cardName = "dataview-" + cardName;
    }
    return cardName;
  };

  const filteredTableData = currentData.map((item) =>
    tableColumns.map((column) => item[column.key])
  );

  const tableHeadings = tableColumns.map((column) => column.displayName);
  const emptyBoxCount = getItemsPerPage() - currentData.length;

  const lastCardClass =
    currentData.length > 0
      ? getComponentName(currentData[currentData.length - 1])
      : "";

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="padding padding-bottom">
      {toggle && (
        <div className={styles["dataview-togglecontainer"]}>
          <button
            className={`${styles["dataview-togglebutton"]} ${
              isCardView ? styles.selected : ""
            }`}
            onClick={showCardView}
          >
            <PiCards className={styles["dataview-icons"]} />
          </button>
          <button
            className={`${styles["dataview-togglebutton"]} ${
              !isCardView ? styles.selected : ""
            }`}
            onClick={showTableView}
          >
            <PiListBullets className={styles["dataview-icons"]} />
          </button>
        </div>
      )}

      <div className={styles["dataview-content"]}>
        {isCardView ? (
          <div className={styles["dataview-cardscontainer"]}>
            {currentData.map((item, index) => (
              <div key={index} className={`${styles[getComponentName(item)]}`}>
                <CardComponent {...item} index={index}/>
              </div>
            ))}
            {!isMobileView &&
              currentPage > 1 &&
              Array.from({ length: emptyBoxCount }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles[lastCardClass]} ${styles["dataview-invisible"]}`}
                ></div>
              ))}
          </div>
        ) : (
          <div className={styles["dataview-tablecontainer"]}>
            <Table data={filteredTableData} headings={tableHeadings} />
            {!isMobileView &&
              currentPage > 1 &&
              Array.from({ length: emptyBoxCount }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles["dataview-invisible"]}`}
                  style={{ height: "45px" }}
                ></div>
              ))}
          </div>
        )}
      </div>

      {viewInactive && (
        <div className={styles["dataview-viewinactive"]}>
          <TextButton
            text={viewInactiveText}
            onClick={onViewInactiveClick}
            variant="default"
          />
        </div>
      )}

      {data?.length > getItemsPerPage() && (
        <div className={styles["dataview-pagination"]}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataView;
