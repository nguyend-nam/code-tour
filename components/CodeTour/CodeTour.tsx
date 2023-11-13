import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import cx from "classnames";

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
              className="w-max text-white transition-all duration-300"
              id={line}
            >
              <pre
                style={{
                  transition: "opacity 0.3s",
                  ...(config?.replaces && amountsAdded.includes(index)
                    ? {
                        animation: "slide-left 0.3s linear forwards",
                      }
                    : {}),
                  backgroundColor: "transparent",
                }}
                className={cx("!py-0 !px-1 md:!px-2", {
                  "!pb-1 md:!pb-2": index === sourceCode.length - 1,
                  "!pt-1 md:!pt-2": index === 0,

                  "opacity-40":
                    config?.focus !== undefined &&
                    ((typeof config?.focus === "number" &&
                      index !== config.focus) ||
                      (Array.isArray(config?.focus) &&
                        !config?.focus.some((f) => {
                          if (Array.isArray(f)) {
                            return index >= f[0] && index <= f[1];
                          } else if (typeof f === "number") {
                            return index === f;
                          }
                        }))),
                })}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(line, {
                      language: sourceLanguage,
                    }).value,
                  }}
                  className="leading-7"
                />
              </pre>
            </div>
          );
        })}
      </>
    );
  }, [currentStep, defaultSourceCode, language]);

  return (
    <div className="h-full p-4 md:p-6 bg-v2-green-normal">
      <div className="bottom-0 pb-4 md:pb-6 gap-4 md:gap-6 left-0 !w-full flex justify-center">
        <button
          className="bg-white p-2 flex justify-center items-center"
          onClick={decreaseStepIndex}
        >
          <Icon
            icon="solar:arrow-left-line-duotone"
            className="text-2xl text-v2-green-normal"
          />
        </button>{" "}
        <button
          className="bg-white p-2 flex justify-center items-center"
          onClick={increaseStepIndex}
        >
          <Icon
            icon="solar:arrow-right-line-duotone"
            className="text-2xl text-v2-green-normal"
          />
        </button>
      </div>

      <div className="h-full overflow-auto">
        <div className="bg-v2-blue-dark w-max min-w-full p-4">
          {codeToRender}
        </div>
      </div>
    </div>
  );
};
