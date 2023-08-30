import { useContext, useState } from "react";
import { getZusServiceUrl } from "@/api/urls";
import { FeedbackContext } from "@/components/content/patient-record-search/helpers/feedback-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { useCTW } from "@/components/core/providers/use-ctw";

type FeedbackForm = {
  feedback: string;
  feedbackType: string;
};

type SubmitFeedback = {
  submit: (data: FeedbackForm) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isError: boolean;
  errorMessage?: string;
};

export const useSubmitFeedback = (name: string): SubmitFeedback => {
  const { analyticsEvent } = useAnalytics();
  const { id } = useContext(FeedbackContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { getRequestContext } = useCTW();

  const submit = async (data: FeedbackForm) => {
    const requestContext = await getRequestContext();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage(undefined);

    try {
      const body = JSON.stringify({
        query_id: id,
        feedback: data.feedback,
        rating: data.feedbackType,
        target: name,
      });
      await fetch(`${getZusServiceUrl(requestContext.env, "search-poc")}/feedback`, {
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${requestContext.authToken}`,
          "Content-Type": "application/json",
          "Zus-Account": requestContext.builderId,
        },
      });
      // Form has been submitted to the search service
      setIsSubmitted(true);
    } catch (error) {
      const err = error as Error;
      setErrorMessage(err.message);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
      // We don't care about the analytics event result
      void analyticsEvent("feedback", {
        value: "ai_search",
        feedbackType: data.feedbackType,
        target: name,
      });
    }
  };

  return {
    submit,
    isSubmitting,
    isSubmitted,
    isError,
    errorMessage,
  };
};
