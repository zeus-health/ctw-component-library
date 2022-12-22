/* eslint-disable react/no-array-index-key */
import { isEmpty, map, startCase } from "lodash";
import { DocumentOnlyProps, LabelValueType } from "../../types";
import { getHeaderData } from "./data";
import "../../../styles.scss";

export const Header = ({ document }: DocumentOnlyProps): JSX.Element => {
  const { title, labelTypeData } = getHeaderData(document);

  return (
    <div className="ctw-ccda-header-container">
      <h2 className="ctw-ccda-header-title">{title}</h2>
      <table className="ctw-ccda-common-table">
        <tbody>
          {map(
            labelTypeData,
            (arrayOfData: LabelValueType[] | undefined, key: string) => {
              if (!arrayOfData) return null;

              const filteredData = arrayOfData.filter((data) => data.value);
              if (isEmpty(filteredData)) return null;
              return (
                <tr key={key}>
                  <td className="ctw-ccda-common-td1">
                    {startCase(key.replace(/\d/g, ""))}
                  </td>
                  <td className="ctw-ccda-common-td2">
                    {filteredData.map((data: LabelValueType, index) => (
                      <span key={`${key}-${index}`}>
                        {data.label && <b>{data.label} </b>}
                        {data.value}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};
