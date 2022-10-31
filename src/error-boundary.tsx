import { Component, ErrorInfo, ReactNode } from "react";

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
export class ErrorBoundary extends Component<Props, State> {
  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public state: State = {
    hasError: false,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("ReactErrorBoundary:", error, errorInfo);
  }

  public render() {
    const { state, props } = this;

    if (state.hasError) {
      return (
        <div className="ctw-conditions ctw-stacked">
          <div className="ctw-heading-container">
            <div className="ctw-title">The Bad News</div>
          </div>
          <div className="ctw-body-container">
            <div className="ctw-space-y-3">
              <div className="ctw-title-container">
                <div className="ctw-title">Error:</div>
                <p>{state.error?.message || "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return props.children;
  }
}
