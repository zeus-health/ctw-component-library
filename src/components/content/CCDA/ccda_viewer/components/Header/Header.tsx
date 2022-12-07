/* eslint-disable react/no-array-index-key */
import { makeStyles } from "@material-ui/core";
import { isEmpty, map, startCase } from "lodash";
import { useCommonStyles } from "../../helpers";
import { DocumentOnlyProps, LabelValueType } from "../../types";
import { getHeaderData } from "./data";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    alignSelf: "center",
  },
}));

export const Header = ({ document }: DocumentOnlyProps): JSX.Element => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const { title, labelTypeData } = getHeaderData(document);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <table className={commonClasses.table}>
        <tbody>
          {map(labelTypeData, (arrayOfData: LabelValueType[], key: string) => {
            if (!arrayOfData) return null;

            const filteredData = arrayOfData.filter((data) => data.value);
            if (isEmpty(filteredData)) return null;
            return (
              <tr key={key}>
                <td className={commonClasses.td1}>
                  {startCase(key.replace(/\d/g, ""))}
                </td>
                <td className={commonClasses.td2}>
                  {filteredData.map((data: LabelValueType, index) => (
                    <span key={`${key}-${index}`}>
                      {data.label && <b>{data.label} </b>}
                      {data.value}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
