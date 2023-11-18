import Head from "next/head";
import Image from "next/image";
import { CodeTour } from "../components/CodeTour";
import cx from "classnames";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { demoSourceCode, demoSteps } from "../constants/source-code";
import { useState } from "react";
import { useEffect } from "react";

export const Brand = ({
  theme = "dark",
  className,
}: {
  theme?: "light" | "dark" | "primary-light" | "primary-dark";
  className?: string;
}) => {
  return (
    <span
      className={cx(
        "text-xl uppercase",
        {
          "text-black": ["dark", "primary-dark"].includes(theme),
          "text-white": ["light", "primary-light"].includes(theme),
        },
        className
      )}
    >
      <b
        className={cx("font-bold", {
          "text-v2-green-normal": ["primary-light", "primary-dark"].includes(
            theme
          ),
        })}
      >
        Code
      </b>
      Tour.
    </span>
  );
};

export default function Home() {
  const { push } = useRouter();

  const [introCodeIndex, setIntroCodeIndex] = useState(0);
  const interval = 3 * 1000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIntroCodeIndex((introCodeIndex + 1) % 3);
    }, interval);

    return () => {
      clearTimeout(timeout);
    };
  }, [interval, introCodeIndex]);

  return (
    <>
      <Head>
        <title>Code Tour</title>
      </Head>
      <header className="px-6 py-2.5 h-[64px] bg-white border-b border-gray-200 fixed w-screen top-0 z-30 flex items-center">
        <div className="flex-1 section-container flex gap-4 justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 relative overflow-hidden">
              <Image
                layout="fill"
                src="/logo.png"
                alt="/logo.png"
                className="object-cover absolute"
              />
            </div>
            <Brand className="hidden xs:block" />
          </div>

          <div className="flex gap-2 items-center">
            <button
              className="bg-gray-100 hover:bg-gray-200 h-10 py-1 px-4 text-gray-600 text-sm"
              onClick={() => push("/introduction")}
            >
              Docs
            </button>
            <a
              href="https://github.com/nguyend-nam/code-tour"
              target="_blank"
              rel="noreferrer"
              className="p-2 h-10 w-10"
            >
              <Icon
                icon="fa-brands:github"
                className="text-[24px] text-black"
              />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-0">
          <div
            className="h-screen min-h-[700px] w-screen pt-[64px] bg-v2-blue-dark"
            style={{
              backgroundImage: 'url("/hero.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="h-full w-full relative">
              <div className="absolute right-0 bottom-[72px] md:bottom-[108px] h-1/2 md:h-3/5 w-full md:w-3/4 lg:w-3/5 max-w-full bg-v2-blue-dark flex flex-col justify-between">
                <div className="py-10 md:py-20 px-6 md:px-20">
                  <Brand
                    theme="primary-light"
                    className="!text-4xl md:!text-5xl block mb-4"
                  />
                  <p className="text-white text-2xl md:text-3xl font-normal max-w-md">
                    Interactive code walkthroughs for the web.
                  </p>
                  <CodeTour
                    defaultSourceCode={`[1]: Interactive
[2]: Intuitive
[3]: Explicit
`}
                    language="markdown"
                    codeContainerClassName="!w-screen lg:!w-[345px] !-mx-5"
                    className="!p-0 md:!pt-6"
                    showNavigationBar={false}
                    steps={[
                      {
                        focus: introCodeIndex,
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="h-[72px] md:h-[108px] absolute right-0 bottom-0 w-full flex items-stretch justify-end">
                <a
                  href="#demo"
                  className="cursor-pointer rounded-none p-4 hidden md:flex justify-center items-center w-[108px] bg-white font-semibold text-v2-blue-dark"
                >
                  <Icon
                    icon="solar:arrow-down-line-duotone"
                    className="text-3xl shrink-0"
                  />
                </a>

                <div className="flex w-full md:w-3/4 lg:w-3/5">
                  <button
                    className="cursor-pointer w-1/2 p-6 md:p-10 bg-v2-green-normal font-semibold text-v2-blue-dark flex items-center gap-2"
                    onClick={() => push("/introduction")}
                  >
                    <Icon
                      icon="solar:arrow-right-line-duotone"
                      className="text-2xl shrink-0"
                    />
                    <span className="text-base md:text-lg">Get Started</span>
                  </button>
                  <a
                    href="https://github.com/nguyend-nam/code-tour"
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer rounded-none w-1/2 p-6 md:p-10 bg-slate-800 font-semibold text-lg text-v2-green-normal flex items-center gap-2"
                  >
                    <Icon icon="uim:github" className="text-2xl shrink-0" />
                    <span className="text-base md:text-lg hidden md:block">
                      View on GitHub
                    </span>
                    <span className="text-base md:text-lg md:hidden block">
                      GitHub
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="demo"
          className="min-h-screen pb-6 flex gap-0 md:gap-8 flex-col lg:flex-row justify-center items-center bg-v2-purple-normal"
        >
          <CodeTour
            defaultSourceCode={demoSourceCode}
            language="javascript"
            codeContainerClassName="!w-screen lg:!w-[465px]"
            steps={demoSteps}
          />
          <div className="p-6 max-w-full lg:max-w-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-v2-green-normal">
              Sequential Navigation Controls
            </h2>
            <p className="text-base md:text-lg text-v2-green-normal">
              <u>Interactive</u> and <u>intuitive</u> walkthrough controls for
              navigating through steps sequentially. Use the left and right
              navigation options to explore your content effortlessly.
            </p>
          </div>
        </section>

        <section className="min-h-screen pb-6 flex gap-0 md:gap-8 flex-col lg:flex-row-reverse justify-center items-center bg-slate-800">
          <CodeTour
            defaultSourceCode={demoSourceCode}
            language="javascript"
            codeContainerClassName="!w-screen lg:!w-[345px]"
            showStepNameButtons
            showNavigationBar={false}
            steps={[...demoSteps.slice(0, 7)]}
          />
          <div className="p-6 max-w-full lg:max-w-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
              Step Selection Buttons
            </h2>
            <p className="text-base md:text-lg text-white">
              <u>Explicit</u> step-by-step tutorial controls with a list of
              buttons. Easily select and navigate to specific steps for a
              detailed and customized exploration of your content.
            </p>
          </div>
        </section>
      </main>

      <footer className="p-6 bg-gray-50">
        <div className="section-container">
          <div className="flex justify-between items-start md:items-center gap-6 pt-8 pb-14 flex-col md:flex-row">
            <div className="flex gap-2.5 items-center">
              <div className="h-12 md:h-14 w-12 md:w-14 relative overflow-hidden">
                <Image
                  layout="fill"
                  src="/logo.png"
                  alt="/logo.png"
                  className="object-cover absolute"
                />
              </div>
              <Brand theme="primary-dark" className="!text-3xl md:!text-4xl" />
            </div>

            <div className="flex gap-2">
              <button
                className="cursor-pointer rounded-none h-12 p-2 border border-v2-green-normal font-medium text-v2-blue-dark flex items-center justify-center gap-2"
                onClick={() => push("/introduction")}
              >
                Get Started
              </button>
              <a
                className="cursor-pointer rounded-none h-12 w-12 p-2 border border-v2-green-normal text-v2-blue-dark flex items-center justify-center gap-2"
                href="https://www.npmjs.com/package/@nguyend-nam/code-tour"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="fa-brands:npm" className="text-2xl shrink-0" />
              </a>
              <a
                href="https://github.com/nguyend-nam/code-tour"
                className="cursor-pointer rounded-none h-12 w-12 p-2 border border-v2-green-normal text-v2-blue-dark flex items-center justify-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="fa-brands:github" className="text-2xl shrink-0" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 text-center md:text-left">
            <a
              href="https://choosealicense.com/licenses/isc/"
              target="_blank"
              rel="noreferrer"
            >
              ISC
            </a>{" "}
            ©{" "}
            <a
              href="https://github.com/nguyend-nam"
              target="_blank"
              rel="noreferrer"
              className="text-v2-blue-dark font-semibold"
            >
              Nam Nguyen Dinh
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
