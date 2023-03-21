import cx from "classnames";
import { ReactElement, ReactNode, useRef } from "react";
import { useBreakpoints } from "@/hooks/use-breakpoints";

type ContainerProps = {
  className?: string;
  children?: ReactNode;
};

type BodyContainerProps = ContainerProps & {
  title?: string;
  titleChildren?: ReactElement;
};

type TitleContainerProps = ContainerProps & {
  title?: string;
};

type HeadingContainerProps = TitleContainerProps;

export function Wrapper({ className, children }: ContainerProps) {
  return <div className={cx("ctw-container", className)}>{children}</div>;
}

export function StackedWrapper({
  className,
  children,
  ...htmlProps
}: ContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const classNames = cx(className, {
    "ctw-stacked": breakpoints.sm,
  });

  return (
    <div className={classNames} ref={containerRef} {...htmlProps}>
      {children}
    </div>
  );
}

export function Heading({ className, title, children }: HeadingContainerProps) {
  return (
    <div className={cx("ctw-heading-container", className)}>
      {title && <div className="ctw-title">{title}</div>}
      {children}
    </div>
  );
}

export function Title({ className, title, children }: TitleContainerProps) {
  return (
    <div className={cx("ctw-title-container", className)}>
      {title && <div className="ctw-title">{title}</div>}
      {children}
    </div>
  );
}

export function Body({
  className,
  title,
  titleChildren,
  children,
}: BodyContainerProps) {
  const showTitleContainer = !!(title || titleChildren);
  return (
    <div className={cx("ctw-body-container", className)}>
      <div className="ctw-space-y-3">
        {showTitleContainer && <Title title={title}>{titleChildren}</Title>}
        {children}
      </div>
    </div>
  );
}
