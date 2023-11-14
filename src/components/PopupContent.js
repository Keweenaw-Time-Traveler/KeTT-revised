import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function CustomSpinner() {
  return (
    <div className="custom-spinner">
      <div className="spinner-circle"></div>
    </div>
  );
}

function PopupContent({ pointId }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allRecordsLoaded, setAllRecordsLoaded] = useState(false);
  const apiUrl = "http://localhost:8888/ktt-api/grid_cell.php";
  const containerRef = React.createRef();
  const fetchData = () => {
    if (!pointId || isLoading || allRecordsLoaded) {
      return;
    }

    const requestData = {
      id: pointId,
      search: "",
      size: 1,
      filters: {
        date_range: "1850-2021",
        featured: "false",
        photos: "false",
        type: "everything",
      },
      pageSize: 100,
      page: currentPage + 1,
    };

    setIsLoading(true);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((apiData) => {
        setIsLoading(false);

        if (apiData.results.people.results.length === 0) {
          // No more data, all records loaded
          setAllRecordsLoaded(true);
          return;
        }

        setTotalRecordCount(apiData.results.people.length);

        setData([...data, ...apiData.results.people.results]);
      
        setCurrentPage(currentPage + 1);
      })
      .catch((error) => {
        console.log("Error fetching data from the API:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [pointId]);

  const handleScroll = () => {
    const element = containerRef.current;

    if (element && !isLoading && !allRecordsLoaded) {
      if (element.scrollTop + element.clientHeight >= element.scrollHeight - 10) {
        fetchData();
      }
    }
  };

// ...

return (
  <div
    onScroll={handleScroll}
    style={{ height: "300px", overflowY: "auto" }}
    ref={containerRef}
  >
    {data.length === 0 && !isLoading && allRecordsLoaded && (
      <p style={{ textAlign: "center", color: "red" }}>No People records found</p>
    )}
    {data.map((item) => (
      <div key={item.id}>
        <h2 style={{ fontWeight: "bold", padding: "10px" }}>{item.title}</h2>
      </div>
    ))}
    {isLoading && <CustomSpinner />}
    {totalRecordCount > data.length && !isLoading && !allRecordsLoaded && (
      <p style={{ textAlign: "center", color: "blue" }}>
        Loading more data... ({totalRecordCount - data.length} remaining)
      </p>
    )}
    {data.length!==0 && allRecordsLoaded && (
      <p style={{ textAlign: "center", color: "green" }}>
        All people records have been loaded
      </p>
    )}
  </div>
);

// ...

}

export default PopupContent;
