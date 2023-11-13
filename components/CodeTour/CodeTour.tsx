import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import hljs from "highlight.js/lib/common";
import { useMemo } from "react";
import { HighlightOptions } from "highlight.js";
import { useCallback } from "react";

interface CodeStep {
  stepName?: string;
  sourceCode?: string;
  focus?: number | ([number, number] | number)[];
  replaces?: {
    line: number;
    values: string;
  }[];
  language?: HighlightOptions["language"];
}

interface CodeTourProps {
  defaultSourceCode: string;
  language: HighlightOptions["language"];
  steps?: CodeStep[];
}

export const CodeTour = (props: CodeTourProps) => {
  const { defaultSourceCode, language, steps = [] } = props;
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

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
        if (event.key === "ArrowRight") {
          increaseStepIndex();
        } else {
          decreaseStepIndex();
        }
      }
    };

    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [decreaseStepIndex, increaseStepIndex]);

  const currentStep = steps.length ? steps[stepIndex] : undefined;

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const codeToRender = useMemo(() => {
    let sourceCode = (currentStep?.sourceCode || defaultSourceCode).split("\n");
    const sourceLanguage = currentStep?.language || language;

    const config = currentStep
      ? {
          focus: currentStep?.focus,
          replaces: currentStep?.replaces,
        }
      : undefined;

    let amountsAdded: number[] = [];

    if (config?.replaces && config?.replaces.length > 0) {
      config.replaces.forEach((replace) => {
        const newLines = [...sourceCode];
        newLines[replace.line] = replace.values;
        sourceCode = newLines.join("\n").split("\n");

        for (let i = 0; i < replace.values.split("\n").length; i++) {
          amountsAdded.push(replace.line + i);
        }
      });
    }

    return (
      <>
        {sourceCode.map((line, index) => {
          return (
            <div
              key={index}
              style={{
                width: "max-content",
                color: "#fff",
                transition: "all 0.3s",
              }}
              id={line}
            >
              <pre
                style={{
                  transition: "opacity 0.3s",
                  backgroundColor: "transparent",
                  paddingLeft: 4,
                  paddingRight: 4,
                  paddingBottom: index === sourceCode.length - 1 ? 4 : 0,
                  paddingTop: index === 0 ? 4 : 0,
                  ...(config?.replaces && amountsAdded.includes(index)
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
                    __html: hljs.highlight(line, {
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
  }, [currentStep, defaultSourceCode, language]);

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          paddingBottom: 24,
        }}
      >
        <button
          style={{
            backgroundColor: "#00DBC0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
          }}
          onClick={decreaseStepIndex}
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
          }}
          onClick={increaseStepIndex}
        >
          <Icon
            icon="solar:arrow-right-line-duotone"
            style={{
              fontSize: "24px",
              color: "#15172E",
            }}
          />
        </button>
      </div>

      <div style={{ height: "100%", overflow: "auto" }}>
        <div
          style={{
            backgroundColor: "#15172E",
            width: "max-content",
            minWidth: "100%",
            padding: 16,
          }}
        >
          {codeToRender}
        </div>
      </div>
    </div>
  );
};
