import React from "react";

export const ChartHeading = ({ text }) => {
  return (
    <div
      style={{
        fontSize: "1.25rem",
        fontWeight: 800,
        width: "85vw",
        margin: "5vh 0 2vh",
      }}
    >
      {text}
    </div>
  );
};
