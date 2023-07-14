import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "@/utils/nodash";

export type ResourceTitleColumnProps = {
  title?: string;
  subTitle?: string;
  ownedByBuilder?: boolean;
  capitalizeTitle?: boolean;
};

export const ResourceTitleColumn = ({
  title,
  subTitle,
  ownedByBuilder,
  capitalizeTitle = true,
}: ResourceTitleColumnProps) => (
  <div>
    <div className="ctw-flow-root group-hover:ctw-underline">
      {capitalizeTitle ? capitalize(title) : title}
      <span className="ctw-float-right">
        {ownedByBuilder ? (
          <FontAwesomeIcon className="ctw-text-content-light" icon={faCircleCheck} />
        ) : (
          <></>
        )}
      </span>
    </div>
    {subTitle ? <div>{subTitle}</div> : null}
  </div>
);
