import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { BASE_URL, ENDPOINTS } from "../utils/networkConstants";
import axios from "axios";
import { TabSwitcher } from "./containers/TabSwitcher";
import { Table } from "./containers/Table";
import { ChartHeading } from "./containers/ChartHeading";
import { TimeSeries } from "./containers/TimeSeries";

export const Dashboard = ({ setSignedIn }) => {
  const [deviceIdArr, setDeviceIdArr] = useState([]);

  const handleGetAll = async () => {
    const { data } = await axios.get(
      BASE_URL + ENDPOINTS.GET_ALL,

      { withCredentials: true }
    );

    if (data?.status === false) {
      setSignedIn(false);
      return;
    }
    if (data) {
      let temp = [];
      for (let key in data) {
        let tempId = data[key]["deviceId"];
        temp.push(tempId);
      }
      setDeviceIdArr(temp);
    }
  };
  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ChartHeading text="Top 10 most windy times recorded by devices" />
      <Table deviceIdArr={deviceIdArr} />

      <ChartHeading text="Time Series Graph" />
      <TimeSeries deviceIdArr={deviceIdArr} />
    </div>
  );
};
