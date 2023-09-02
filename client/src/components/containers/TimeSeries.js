import React, { useEffect, useState } from "react";
import styles from "../../styles/TimeSeries.module.css";
import { TabSwitcher } from "./TabSwitcher";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL, ENDPOINTS } from "../../utils/networkConstants";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";

export const TimeSeries = ({ deviceIdArr }) => {
  const [currentDeviceIdIndex, setCurrentDeviceIdIndex] = useState(0);
  const [startDate, setStartDate] = useState(new Date("2021/05/03"));
  const [endDate, setEndDate] = useState(new Date("2021/05/04"));

  const [devicesData, setDevicesData] = useState([]);

  useEffect(() => {
    const handleTimeData = async () => {
      const { data } = await axios.get(
        BASE_URL +
          ENDPOINTS.GET_TIME_RANGE_DATA +
          `?startDate=${startDate}&endDate=${endDate}`,

        { withCredentials: true }
      );

      if (data[currentDeviceIdIndex]?.data) {
        setDevicesData(data[currentDeviceIdIndex]?.data);
      } else {
        toast.error("No Data found for this time range and device", {
          position: "bottom-left",
        });
        setDevicesData([]);
      }
    };
    handleTimeData();
  }, [startDate, endDate, deviceIdArr, currentDeviceIdIndex]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.datePickerWrapper}>
          <div className={styles.datePickerContainer}>
            Start Date :{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className={styles.datePickerContainer}>
            End Date :{" "}
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>
        <TabSwitcher
          tabs={deviceIdArr}
          currentTab={currentDeviceIdIndex}
          setCurrentTab={setCurrentDeviceIdIndex}
        />
      </div>

      {devicesData.length > 0 && (
        <ResponsiveContainer
          width={window.outerWidth * 0.7}
          height={window.outerHeight * 0.6}
        >
          <AreaChart
            width={window.outerWidth * 0.7}
            height={window.outerHeight * 0.7}
            data={devicesData}
            margin={{
              top: 50,
              right: 0,
              left: 0,
              bottom: 50,
            }}
          >
            {/* <CartesianGrid strokeDasharray="10 10" /> */}
            <XAxis
              tickMargin={40}
              angle={-30}
              dataKey="timestamp"
              tickFormatter={(value) => {
                return value.split("T")[0];
              }}
            />
            <YAxis />
            <Tooltip />
            <Area
              //   type="monotone"
              dataKey="pm1"
              stackId="2"
              stroke="#8884d8"
              fill="none"
            />
            <Area
              //   type="monotone"
              dataKey="pm25"
              stackId="3"
              stroke="#82ca9d"
              fill="none"
            />
            <Area
              //   type="monotone"
              dataKey="pm10"
              stackId="1"
              stroke="#ffc658"
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
