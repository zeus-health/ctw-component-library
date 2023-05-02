import { useCallback } from "react";

export type ActionCallback<TInput, TOutput> = (input: TInput) => Promise<TOutput>;
export type ActionInterceptor<TInput, TOutput> = (
  input: TInput,
  next: ActionCallback<TInput, TOutput>
) => Promise<TOutput>;

export type DynamicValue<TInput, TOutcome, TResult> =
  | null
  | ((result: TOutcome, input: TInput) => TResult);

export function getDynamicValue<TInput, TOutcome, TResult>(
  config: DynamicValue<TInput, TOutcome, TResult>,
  input: TInput,
  result: TOutcome
): TResult | null {
  if (typeof config === "function") {
    return config(result, input);
  }

  return config;
}

export interface UseActionOptions<TInput, TOutput> {

  /**
   * Callback when the promise resolves successfully
   */
  onSuccess?: (result: TOutput, params: TInput) => void;

  /**
   * Callback when the promise is rejected with an error
   */
  onError?: (error: unknown, params: TInput) => void;
}

/**
 * Creates a wrapped callback that can optionally trigger callbacks
 */
export function useAction<TInput, TOutput>(
  callback: ActionCallback<TInput, TOutput>,
  options: UseActionOptions<TInput, TOutput>,
  deps: unknown[] = []
): ActionCallback<TInput, TOutput | void> {
  const { onSuccess, onError } = options;

  return useCallback(
    (input: TInput) => callback(input).then(
        (result) => {
          onSuccess?.(result, input);
          return result;
        },
        (error) => {
          onError?.(error, input);
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, onSuccess, onError, ...deps]
  );
}
