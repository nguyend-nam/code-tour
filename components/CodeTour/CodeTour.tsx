import { Icon } from "@iconify/react";
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from "react";
import { insertByIndex } from "../../utils";
import cx from "classnames";

import hljs from "highlight.js/lib/common";
import { HighlightOptions } from "highlight.js";

export interface CodeStepConfig {
  stepName?: string;
  sourceCode?: string;
  focus?: number | ([number, number] | number)[];
  replaces?: {
    line: number;
    values: string;
  }[];
  inserts?: {
    line: number;
    values: string;
  }[];
  language?: HighlightOptions["language"];
}

export interface CodeTourProps {
  defaultSourceCode: string;
  language: HighlightOptions["language"];
  steps?: CodeStepConfig[];
  showNavigationBar?: boolean;
  showStepNameButtons?: boolean;
  className?: string;
  style?: CSSProperties;
  navigationClassName?: string;
  navigationStyle?: CSSProperties;
  navigationButtonClassName?: string;
  navigationButtonStyle?: CSSProperties;
  codeContainerClassName?: string;
  codeContainerStyle?: CSSProperties;
  codeLineClassName?: string;
  codeLineStyle?: CSSProperties;
  stepButtonsContainerClassName?: string;
  stepButtonsContainerStyle?: CSSProperties;
  stepButtonClassName?: string;
  stepButtonStyle?: CSSProperties;
}

export const CodeTour = (props: CodeTourProps) => {
  const {
    defaultSourceCode,
    language,
    steps = [],
    showStepNameButtons = false,
    showNavigationBar = true,
    className,
    style,
    navigationClassName,
    navigationStyle,
    navigationButtonClassName,
    navigationButtonStyle,
    codeContainerClassName,
    codeContainerStyle,
    codeLineClassName,
    codeLineStyle,
    stepButtonsContainerClassName,
    stepButtonsContainerStyle,
    stepButtonClassName,
    stepButtonStyle,
  } = props;
  const [stepIndex, setStepIndex] = useState(0);

  const increaseStepIndex = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  }, [stepIndex, steps.length]);

  const decreaseStepIndex = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  }, [stepIndex]);

  // useEffect(() => {
  //   const onKeyPress = (event: KeyboardEvent) => {
  //     if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
  //       if (event.key === "ArrowRight") {
  //         increaseStepIndex();
  //       } else {
  //         decreaseStepIndex();
  //       }
  //     }
  //   };

  //   document.addEventListener("keydown", onKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", onKeyPress);
  //   };
  // }, [decreaseStepIndex, increaseStepIndex]);

  const currentStep = steps.length ? steps[stepIndex] : undefined;

  const [lines, setLines] = useState(
    (currentStep?.sourceCode || defaultSourceCode).split("\n").length
  );

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const codeToRender = useMemo(() => {
    let sourceCodeToDisplay = (currentStep?.sourceCode || defaultSourceCode)
      .split("\n")
      .map((line) => ({ value: line, animated: false }));
    const sourceLanguage = currentStep?.language || language;

    const config = currentStep
      ? {
          focus: currentStep?.focus,
          replaces: currentStep?.replaces,
          inserts: currentStep?.inserts,
        }
      : undefined;

    if (config?.inserts && config?.inserts.length > 0) {
      const mappedInserts = config.inserts.map((insert) => ({
        index: insert.line,
        value: insert.values,
      }));

      sourceCodeToDisplay = insertByIndex(
        sourceCodeToDisplay,
        mappedInserts
          .map((insert) => ({
            index: insert.index,
            value: { value: insert.value, animated: true },
          }))
          .reverse()
      );
    }

    if (config?.replaces && config?.replaces.length > 0) {
      config.replaces.forEach((replace) => {
        const newLines = [...sourceCodeToDisplay];
        newLines[replace.line] = { value: replace.values, animated: true };
        sourceCodeToDisplay = newLines;
      });
    }

    setLines((sourceCodeToDisplay || []).length);

    return (
      <>
        {sourceCodeToDisplay.map((line, index) => {
          return (
            <div
              key={index}
              style={{
                width: "max-content",
                color: "#FFF",
                transition: "opacity 0.3s",
                ...codeLineStyle,
              }}
              className={cx("ct-code-line", codeLineClassName)}
              id={line.value}
            >
              <pre
                style={{
                  transition: "opacity 0.3s",
                  backgroundColor: "transparent",
                  paddingLeft: 4,
                  paddingRight: 4,
                  ...(line.animated
                    ? {
                        animation: "slide-left 0.3s linear forwards",
                      }
                    : {}),
                  ...(config?.focus !== undefined &&
                  ((typeof config?.focus === "number" &&
                    index !== config.focus) ||
                    (Array.isArray(config?.focus) &&
                      !config?.focus.some((f) => {
                        if (Array.isArray(f)) {
                          return index >= f[0] && index <= f[1];
                        } else if (typeof f === "number") {
                          return index === f;
                        }
                      })))
                    ? {
                        opacity: 0.4,
                      }
                    : {}),
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(line.value, {
                      language: sourceLanguage,
                    }).value,
                  }}
                  style={{
                    lineHeight: "28px",
                  }}
                />
              </pre>
            </div>
          );
        })}
      </>
    );
  }, [
    codeLineClassName,
    codeLineStyle,
    currentStep,
    defaultSourceCode,
    language,
  ]);

  return (
    <div
      style={{ maxWidth: "100%", padding: 24, ...style }}
      className={className}
    >
      {showNavigationBar ? (
        <CodeTourNavigation
          steps={steps}
          stepIndex={stepIndex}
          onPrevClick={decreaseStepIndex}
          onNextClick={increaseStepIndex}
          navigationStyle={navigationStyle}
          navigationButtonStyle={navigationButtonStyle}
          navigationButtonClassName={navigationButtonClassName}
          navigationClassName={navigationClassName}
        />
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          alignItems: "center",
          width: "100%",
        }}
      >
        {showStepNameButtons ? (
          <StepButtonsControl
            lines={lines}
            stepIndex={stepIndex}
            setStepIndex={setStepIndex}
            steps={steps}
            stepButtonsContainerStyle={stepButtonsContainerStyle}
            stepButtonsContainerClassName={stepButtonsContainerClassName}
            stepButtonStyle={stepButtonStyle}
            stepButtonClassName={stepButtonClassName}
          />
        ) : null}

        <div
          style={{
            boxSizing: "border-box",
            overflow: "auto",
            backgroundColor: "#15172E",
            flexGrow: 1,
            ...codeContainerStyle,
          }}
          className={cx("ct-code-container", codeContainerClassName)}
        >
          <div
            style={{
              width: "max-content",
              minWidth: "100%",
              padding: 16,
            }}
          >
            {codeToRender}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CodeTourNavigationProps {
  steps: CodeStepConfig[];
  stepIndex: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  navigationStyle?: CSSProperties;
  navigationClassName?: string;
  navigationButtonStyle?: CSSProperties;
  navigationButtonClassName?: string;
}

const CodeTourNavigation = ({
  steps,
  stepIndex,
  onPrevClick,
  onNextClick,
  navigationStyle,
  navigationClassName,
  navigationButtonStyle,
  navigationButtonClassName,
}: CodeTourNavigationProps) => {
  return (
    <nav
      style={{
        display: "flex",
        gap: 24,
        justifyContent: "center",
        paddingBottom: 24,
        ...navigationStyle,
      }}
      role="navigation"
      className={cx("ct-navigation-bar", navigationClassName)}
    >
      <button
        style={{
          backgroundColor: "#00DBC0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          height: 40,
          width: 40,
          transition: "opacity 0.3s",
          ...(stepIndex === 0 ? { opacity: 0.6, cursor: "not-allowed" } : {}),
          ...navigationButtonStyle,
        }}
        className={cx("ct-navigation-button", navigationButtonClassName, {
          "ct-navigation-button--disabled": stepIndex === 0,
        })}
        onClick={onPrevClick}
        disabled={stepIndex === 0}
      >
        <Icon
          icon="solar:arrow-left-line-duotone"
          style={{
            fontSize: "24px",
            color: "#15172E",
          }}
        />
      </button>
      <button
        style={{
          backgroundColor: "#00DBC0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          height: 40,
          width: 40,
          transition: "opacity 0.3s",
          ...(stepIndex === steps.length - 1
            ? { opacity: 0.6, cursor: "not-allowed" }
            : {}),
          ...navigationButtonStyle,
        }}
        className={cx("ct-navigation-button", navigationButtonClassName, {
          "ct-navigation-button--disabled": stepIndex === steps.length - 1,
        })}
        onClick={onNextClick}
        disabled={stepIndex === steps.length - 1}
      >
        <Icon
          icon="solar:arrow-right-line-duotone"
          style={{
            fontSize: "24px",
            color: "#15172E",
          }}
        />
      </button>
    </nav>
  );
};

interface StepButtonsControlProps {
  lines: number;
  stepIndex: number;
  setStepIndex: Dispatch<SetStateAction<number>>;
  steps?: CodeStepConfig[];
  stepButtonsContainerStyle?: CSSProperties;
  stepButtonsContainerClassName?: string;
  stepButtonStyle?: CSSProperties;
  stepButtonClassName?: string;
}

const StepButtonsControl = ({
  lines,
  stepIndex,
  setStepIndex,
  steps = [],
  stepButtonsContainerStyle,
  stepButtonsContainerClassName,
  stepButtonStyle,
  stepButtonClassName,
}: StepButtonsControlProps) => {
  return (
    <div
      style={{
        overflow: "auto",
        flexShrink: 0,
        height: `${lines * 28 + 32}px`,
        ...stepButtonsContainerStyle,
      }}
      className={cx("ct-step-button-container", stepButtonsContainerClassName)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 8,
        }}
      >
        {steps.map((step, index) => {
          const stepName = step?.stepName ? step.stepName : `Step ${index + 1}`;

          return (
            <button
              style={{
                textAlign: "left",
                padding: "4px 8px",
                backgroundColor: stepIndex === index ? "#00DBC0" : "#FFF",
                color: stepIndex === index ? "#FFF" : "#15172E",
                width: 120,
                borderRadius: 0,
                border: "1px solid #E2E8F0",
                boxSizing: "border-box",
                ...stepButtonStyle,
              }}
              className={cx(
                "ct-step-button",
                {
                  "ct-step-button--active": stepIndex === index,
                },
                stepButtonClassName
              )}
              title={stepName}
              onClick={() => setStepIndex(index)}
              key={
                `Step ${index + 1}` +
                (step?.stepName ? ` ${step.stepName}` : "")
              }
            >
              {stepName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
