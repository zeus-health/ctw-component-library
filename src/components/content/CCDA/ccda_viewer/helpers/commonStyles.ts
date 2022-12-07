import { makeStyles } from "@material-ui/core";

export const useCommonStyles = makeStyles(() => ({
  table: {
    border: "1px solid black",
    "& td": {
      border: "1px solid black",
    },
  },
  td1: {
    background: "#d3d3d3",
    width: "15%",
    padding: "0 5px",
    fontWeight: "bold",
    verticalAlign: "top",
  },
  td2: {
    background: "#f2f2f2",
    verticalAlign: "top",
    width: "35%",
    whiteSpace: "pre-wrap",
    padding: "0 5px",
    "& span": {
      marginRight: "10px",
    },
    "& b": {
      marginRight: "3px",
    },
  },
}));
