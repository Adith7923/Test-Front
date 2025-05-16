import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataView, Greeting } from "../../../layouts/common";
import SkillBatchCard from "../../../components/cards/SkillBatchCard";
import { fetchbatches, createBatch } from "../../../services/Batch";
import AdminBatchAction from "../../../layouts/admin-batches/components/AdminBatchAction";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";

const AdminBatchList = () => {
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changed, setChanged] = useState(false);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      fetchData();
      setInitialLoad(false);
    } else if (searchQuery) {
      fetchData({ batchName: searchQuery });
    } else {
      fetchData();
    }
  }, [changed, searchQuery]);

  const fetchData = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await fetchbatches(params || {});
      const data = responseData.responseData;

      if (Array.isArray(data)) {
        const formattedData = data.map((item) => ({
          miniHeading: `B${item.batchId}`,
          mainHeading: item.batchName || "",
          Count: item.participantCount,
          cardType: "batch",
          showCount: true,
          creationDate: item.creationDate,
          handleClick: () => handleClick(item.batchId, item.batchName),
        }));

        const sortedBatches = formattedData.sort((a, b) => {
          const nameA = a.mainHeading.toLowerCase();
          const nameB = b.mainHeading.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setBatchData(sortedBatches);
        setFilteredBatches(sortedBatches);
      } else {
        throw new Error("Received data is not in expected format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("No Batches to display");
    } finally {
      setLoading(false);
    }
  };

  // const handleSearchChange = (data) => {
  //   setSearchQuery(data);
  //   setChanged((prev) => !prev);
  // };

  const handleSearchChange = (batches) => {
    const searchValue = batches.toLowerCase();
    setSearchTerm(searchValue);
    const filteredData = batchData.filter((batch) =>
      batch.mainHeading.toLowerCase().includes(searchValue)
    );
    setFilteredBatches(filteredData);
  };

  const handleClick = (batchId, batchName) => {
    navigate(`/admin/batches/batch-details/${batchId}`, {
      state: { batchName },
    });
  };

  const handleFormSubmit = async (formData) => {
    try {
      const { batchName } = formData;
      const response = await createBatch({ batchName: batchName });
      setBatchData([...(batchData || []), response[0]]);
      setChanged((prev) => !prev);
    } catch (error) {
      console.error("Error adding batch:", error);
      setError("Error adding batch. Please try again later.");
    }
  };

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const loggedUserFirstName = userSession.firstName;

  return (
    <div>
      {/* <Greeting
        welcome="Welcome back"
        name={loggedUserFirstName}
        info="Here is the information about"
        profile="Batches"
        showButtons={false}
      /> */}
      <AdminBatchAction
        count={batchData ? filteredBatches.length : 0}
        onSearchChange={handleSearchChange}
        setBatchData={setBatchData}
        setChanged={setChanged}
        batchData={batchData}
      />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p style={{ padding: "2vh 4vw", color: "white" }}>{error}</p>
      ) : filteredBatches && filteredBatches.length > 0 ? (
        <div>
          <DataView
            data={filteredBatches}
            CardComponent={(props) => <SkillBatchCard {...props} />}
            tableColumns={[
              { key: "miniHeading", displayName: "Batch ID" },
              { key: "mainHeading", displayName: "Batch Name" },
              { key: "Count", displayName: "Participant Count" },
              { key: "creationDate", displayName: "Creation Date" },
            ]}
            toggle={true}
            cardType="skillbatchcardbatch"
            itemsPerPage={12}
            showCount={true}
            creationDate={true}
          />
        </div>
      ) : (
        <NoData title="Batches" />
      )}
    </div>
  );
};

export default AdminBatchList;
