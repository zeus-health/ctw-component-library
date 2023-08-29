import type { PropsWithChildren } from "react";
import { Children } from "react";

export function RenderIf(props: PropsWithChildren<{ condition: boolean }>) {
  return <>{props.condition && props.children}</>;
}

export function RenderIfElse(props: PropsWithChildren<{ condition: boolean }>) {
  if (Children.count(props.children) !== 2) {
    throw new Error("RenderWhenElse must have exactly two children");
  }

  return (
    <>
      {Children.map(props.children, (child, idx) => {
        if ((props.condition && idx === 0) || (!props.condition && idx === 1)) {
          return child;
        }
        return <></>;
      })}
    </>
  );
}
