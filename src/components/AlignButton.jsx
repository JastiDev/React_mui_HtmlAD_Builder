import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const classes = makeStyles({
  iconRoot: {
    textAlign: "center",
  },
  imageIcon: {
    height: "100%",
  },
});
const icons = [
  "/img/align_horizontal_left_icon.svg",
  "/img/align_horizontal_center_icon.svg",
  "/img/align_horizontal_right_icon.svg",
  "/img/align_vertical_top_icon.svg",
  "/img/align_vertical_center_icon.svg",
  "/img/align_vertical_bottom_icon.svg",
];

export const AlignButton = ({ alignType, handleClick }) => {
  return (
    <IconButton classes={{ root: classes.iconRoot }} onClick={handleClick}>
      <img className={classes.imageIcon} src={icons[alignType]} />
    </IconButton>
  );
};
