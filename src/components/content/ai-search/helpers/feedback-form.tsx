import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { ChangeEvent, useEffect, useState } from "react";
import { useSubmitFeedback } from "@/components/content/ai-search/helpers/use-submit-feedback";
import { Loading } from "@/components/core/loading";

export const FeedbackForm = ({ name }: { name: string }) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const { submit, isSubmitting, isSubmitted, isError, errorMessage } = useSubmitFeedback(name);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isSubmitted) {
      setShowFinalMessage(true);
      timeoutId = setTimeout(() => {
        setShowFinalMessage(false);
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [isSubmitted]);

  const handleThumbsDownClick = () => {
    setFeedbackType("negative");
    setShowTextInput(true);
  };

  const handleThumbsUpClick = () => {
    setFeedbackType("positive");
    setShowTextInput(false);
    submit({
      feedback: "",
      feedbackType: "positive",
    });
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    submit({
      feedback,
      feedbackType,
    });
  };

  const handleClear = () => {
    setShowTextInput(false);
    setFeedback("");
    setFeedbackType("");
    setShowFinalMessage(false);
  };

  if (isSubmitting) {
    return (
      <div>
        Submitting feedback... <Loading />
      </div>
    );
  }

  if (isSubmitted) {
    return showFinalMessage ? (
      <div className="ctw-ml-1.5 ctw-mr-1.5 ctw-inline-block ctw-text-sm ctw-font-light">
        <span>
          {isError
            ? `There was an error submitting your feedback; ${errorMessage}`
            : "Thank you for your feedback!"}
        </span>
      </div>
    ) : null;
  }

  return (
    <div className="ctw-ml-1.5 ctw-mr-1.5 ctw-inline-block ctw-text-sm ctw-font-light">
      {!showTextInput && (
        <>
          <button
            type="button"
            className="ctw-btn ctw-btn-clear ctw-mr-0.5"
            onClick={handleThumbsUpClick}
          >
            <span className="ctw-inline-block ctw-h-4 ctw-w-4">
              {" "}
              <ThumbUpIcon className="ctw-stroke-black hover:ctw-fill-primary-light hover:ctw-stroke-primary-dark" />
            </span>
          </button>
          <button
            type="button"
            className="ctw-btn ctw-btn-clear ctw-mr-0.5"
            onClick={handleThumbsDownClick}
          >
            <span className="ctw-inline-block ctw-h-4 ctw-w-4">
              {" "}
              <ThumbDownIcon className="ctw-stroke-black hover:ctw-fill-error-light hover:ctw-stroke-error-dark" />
            </span>
          </button>
        </>
      )}

      {showTextInput && (
        <>
          <input
            type="text"
            placeholder="Please provide more feedback..."
            className="ctw-rounded-md ctw-border ctw-border-solid ctw-border-icon-light ctw-bg-bg-white ctw-px-3 ctw-py-2 ctw-pl-1.5 ctw-pr-1.5 ctw-text-sm ctw-shadow-sm"
            value={feedback}
            onChange={handleTextInputChange}
            onKeyUp={(event) => {
              if (!event.metaKey && event.key === "Enter") handleSubmit();
              if (event.key === "Escape") {
                handleClear();
              }
            }}
          />
          <button type="button" className="ctw-btn ctw-btn-primary ctw-ml-3" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};
