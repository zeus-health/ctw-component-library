import cx from "classnames";
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useRef,
} from "react";
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

export type ScrollingContainerProps = {
  height?: string;
  scrollingEnabled?: boolean;
};

type DivProps = PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

type ContainerScrollablePatternProps = ScrollingContainerProps &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  DivProps;

type ScrollableContentProps = DivProps;

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

export const Box = forwardRef<HTMLDivElement, DivProps>(
  ({ children, ...props }, ref) => (
    <div {...props} ref={ref}>
      {children}
    </div>
  )
);

/**
 * This container will allow for a (deeply) nested element to have scrollbars
 * while still controlling the height of the overall component. For example below
 * we set the height on the top-level component and our ScrollableContent
 * will fill to the remaining height of the element after taking into
 * consideration the height of all the other content in ScrollableContainers.
 * ```tsx
 * <ScrollableContainer height="30rem">
 *   <ScrollableContainer>
 *     <ScrollableContainer>
 *       <h1>Some title</h1>
 *       <img src="./100px-tall-image.src" />
 *     </ScrollableContainer>
 *     <ScrollableContent>
 *       {..tons of content...}
 *     </ScrollableContent>
 *   </ScrollableContainer>
 * </ScrollableContainer>
 * ```
 */
export const ScrollableContainer = forwardRef<
  HTMLDivElement,
  ContainerScrollablePatternProps
>(({ children, className, scrollingEnabled = true, height, ...props }, ref) => {
  const isScrollablePattern = !!(scrollingEnabled || height);
  const style = height && isScrollablePattern ? { height } : {};
  const scrollableClassName = height
    ? "ctw-relative"
    : "ctw-scrollable-container";

  return (
    <Box
      {...props}
      ref={ref}
      style={style}
      className={cx(className, { [scrollableClassName]: isScrollablePattern })}
    >
      {children}
    </Box>
  );
});

export const ScrollableContent = forwardRef<
  HTMLDivElement,
  ScrollableContentProps
>(({ children, className, ...props }, ref) => (
  <div ref={ref} {...props} className={cx(className, "ctw-scrollable-content")}>
    {children}
  </div>
));
