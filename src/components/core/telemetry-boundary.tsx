import { Component, ErrorInfo, ReactNode } from "react";
import * as CTWBox from "@/components/core/ctw-box";
import { Telemetry } from "@/utils/telemetry";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary for internal use.
 */
export class TelemetryBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  state: State = {
    hasError: false,
  };

  componentDidMount() {
    const {
      props: { children },
    } = this;
    Telemetry.logger.info(`Loaded component ${children?.constructor.name}`);
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Telemetry.logger.error(error.message, {
      ...errorInfo,
      error: {
        stack: error.stack,
      },
    });
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
            <div className="ctw-py-1 ctw-px-5">
              <p>{state.error?.message || "Unknown"}</p>
              <button
                type="button"
                className="ctw-btn-primary"
                onClick={this.resetState}
              >
                Refresh Component
              </button>
            </div>
          </CTWBox.Body>
        </CTWBox.Wrapper>
      );
    }

    return props.children;
  }
}
