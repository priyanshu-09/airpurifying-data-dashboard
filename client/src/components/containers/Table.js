import React, { useEffect, useState } from "react";
import { TabSwitcher } from "./TabSwitcher";
import styles from "../../styles/Table.module.css";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../../utils/networkConstants";

export const Table = ({ deviceIdArr }) => {
  const [currentDeviceIdIndex, setCurrentDeviceIdIndex] = useState(0);

  const [windyDaysArr, setWindyDaysArr] = useState([]);

  useEffect(() => {
    const handleGetOne = async () => {
      if (deviceIdArr.length > 0) {
        const { data } = await axios.get(
          BASE_URL +
            ENDPOINTS.GET_ONE +
            `/${deviceIdArr[currentDeviceIdIndex]}`,

          { withCredentials: true }
        );

        handleWindy(data.data);
      }
    };
    handleGetOne();
  }, [currentDeviceIdIndex, deviceIdArr]);

  const handleWindy = (data) => {
    const temp = data.sort((a, b) => {
      return b.windSpeed - a.windSpeed;
    });

    setWindyDaysArr(temp);
  };

  return (
    <div className={styles.wrapper}>
      <TabSwitcher
        tabs={deviceIdArr}
        currentTab={currentDeviceIdIndex}
        setCurrentTab={setCurrentDeviceIdIndex}
      />
      <div className={styles.tableHeader}>
        <div className={styles.tableHeadings}>Date</div>
        <div className={styles.tableHeadings}>Wind Direction</div>
        <div className={styles.tableHeadings}>Wind Speed</div>
        <div className={styles.tableHeadings}>pm1</div>
        <div className={styles.tableHeadings}>pm2.5</div>
        <div className={styles.tableHeadings}>pm10</div>
      </div>
      <div className={styles.tableContainer}>
        {windyDaysArr.map((item, index) => {
          if (index < 10)
            return (
              <div
                className={styles.tableRow}
                style={{ borderBottom: index === 9 ? "none" : "" }}
                key={index}
              >
                <div className={styles.tableData}>
                  {item.timestamp.split("T")[0]}
                </div>
                <div className={styles.tableData}>{item.windDirection}</div>
                <div className={styles.tableData}>{item.windSpeed}</div>
                <div className={styles.tableData}>{item.pm1}</div>
                <div className={styles.tableData}>{item.pm25}</div>
                <div className={styles.tableData}>{item.pm10}</div>
              </div>
            );
        })}
      </div>
    </div>
  );
};
