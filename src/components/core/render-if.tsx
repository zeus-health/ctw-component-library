import type { PropsWithChildren } from "react";

export function RenderIf(props: PropsWithChildren<{ condition: boolean }>) {
  return <>{props.condition && props.children}</>;
}
