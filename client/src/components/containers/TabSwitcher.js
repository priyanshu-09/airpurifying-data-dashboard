import React from "react";
import styles from "../../styles/TabSwitcher.module.css";

export const TabSwitcher = ({ tabs, setCurrentTab, currentTab }) => {
  return (
    <div className={styles.wrapper}>
      {tabs.map((item, index) => {
        return (
          <div
            className={styles.button}
            onClick={() => {
              setCurrentTab(index);
            }}
            style={{
              borderLeft:
                index === 0 ? "none" : "1px solid var(--background-color)",
              opacity: currentTab === index ? 1 : 0.4,
            }}
            key={index}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
