import {
  Component,
  ComponentType,
  createElement,
  ErrorInfo,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from "react";
import * as CTWBox from "@/components/core/ctw-box";
import { pickBy } from "@/utils/nodash";
import { Telemetry } from "@/utils/telemetry";

interface Props {
  children?: ReactNode;
  name?: string;
  trackView?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary for internal use.
 */
export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  state: State = {
    hasError: false,
  };

  componentDidMount() {
    const { props } = this;
    if (props.name) {
      Telemetry.logger.info(`Loaded component ${props.name}`);
      if (props.trackView) {
        Telemetry.trackView(props.name);
      }
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { props } = this;
    Telemetry.countMetric(`component.${props.name}.failure`);
    Telemetry.logger.error(
      error.message,
      pickBy({
        ...errorInfo,
        componentName: props.name,
        error: {
          stack: error.stack,
        },
      })
    );
  }

  resetState = () => {
    this.setState({ hasError: false });
  };

  public render() {
    const { state, props } = this;

    if (state.hasError) {
      return (
        <CTWBox.Wrapper>
          <CTWBox.Body
            title="Sorry, we have encountered an error."
            className="ctw-flex ctw-items-center ctw-justify-between"
          >
            <div className="ctw-px-5 ctw-py-1">
              <p>{state.error?.message || "Unknown"}</p>
              <button
                type="button"
                className="ctw-btn-primary ctw-capitalize"
                onClick={this.resetState}
              >
                Refresh component
              </button>
            </div>
          </CTWBox.Body>
        </CTWBox.Wrapper>
      );
    }

    return props.children;
  }
}

export function withErrorBoundary<CProps extends object>(
  component: ComponentType<CProps>,
  name?: string,
  trackView = true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ForwardRefExoticComponent<PropsWithoutRef<CProps> & RefAttributes<any>> {
  const Wrapped = forwardRef<ComponentType<CProps>, CProps>(
    (props: CProps, ref: ForwardedRef<ComponentType<CProps>>) =>
      createElement(ErrorBoundary, { name, trackView }, createElement(component, { ...props, ref }))
  );

  // Format for display in DevTools
  Wrapped.displayName = `withErrorBoundary(${name})`;

  return Wrapped;
}
