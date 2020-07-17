import React from "react";
import { AlignButton } from "./AlignButton";

export const AlignMulti = ({ handleAlignMulti }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>Align Items (Shift + Click)</div>
      <div>
        <AlignButton
          alignType={0}
          handleClick={() => handleAlignMulti(0)}
        ></AlignButton>
        <AlignButton
          alignType={1}
          handleClick={() => handleAlignMulti(1)}
        ></AlignButton>
        <AlignButton
          alignType={2}
          handleClick={() => handleAlignMulti(2)}
        ></AlignButton>
      </div>
      <div>
        <AlignButton
          alignType={3}
          handleClick={() => handleAlignMulti(3)}
        ></AlignButton>
        <AlignButton
          alignType={4}
          handleClick={() => handleAlignMulti(4)}
        ></AlignButton>
        <AlignButton
          alignType={5}
          handleClick={() => handleAlignMulti(5)}
        ></AlignButton>
      </div>
    </div>
  );
};
