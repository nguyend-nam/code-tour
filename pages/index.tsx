import Head from "next/head";
import Image from "next/image";
import { CodeTour } from "../components/CodeTour";
import cx from "classnames";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export const Brand = ({
  theme = "dark",
  className,
}: {
  theme?: "light" | "dark" | "primary-light";
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

const str = `function lorem(ipsum, dolor) {
  const sit = "lorem ipsum";
  dolor = elit(dolor, 3);
  
  while (++consectetur < amet) {
    // TODO
  }
}`;

export default function Home() {
  const { push } = useRouter();

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
            <Brand />
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
              <Icon icon="cib:github" className="text-[24px] text-black" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-0">
          <div
            className="h-screen min-h-[700px] w-screen pt-[64px]"
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
                  <p className="text-white text-2xl md:text-3xl font-normal">
                    Interactive code walkthroughs
                    <br />
                    for the web.
                  </p>
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

        <div
          id="demo"
          className="h-screen min-h-[700px] flex justify-center items-center bg-v2-purple-normal"
        >
          <CodeTour
            defaultSourceCode={str}
            language="javascript"
            codeContainerClassName="!max-w-[349px]"
            steps={[
              {},
              {
                focus: [0, [4, 6]],
              },
              {
                focus: 5,
                replaces: [
                  {
                    line: 5,
                    values: "    sit.eiusmod();",
                  },
                ],
              },
              {
                focus: 5,
                replaces: [
                  {
                    line: 5,
                    values: '    sit.eiusmod("dolor sit amet");',
                  },
                ],
              },
              {
                focus: 6,
                replaces: [
                  {
                    line: 5,
                    values: '    sit.eiusmod("dolor sit amet");',
                  },
                ],
                inserts: [
                  {
                    line: 6,
                    values: "    tempor();",
                  },
                ],
              },
              {
                focus: 6,
                replaces: [
                  {
                    line: 5,
                    values: '    sit.eiusmod("dolor sit amet");',
                  },
                ],
                inserts: [
                  {
                    line: 6,
                    values: "    tempor(ipsum, adipiscing);",
                  },
                ],
              },
              {
                replaces: [
                  {
                    line: 5,
                    values: '    sit.eiusmod("dolor sit amet");',
                  },
                ],
                inserts: [
                  {
                    line: 6,
                    values: "    tempor(ipsum, adipiscing);",
                  },
                ],
              },
              {
                focus: [4, 7],
                replaces: [
                  {
                    line: 5,
                    values: '    sit.eiusmod("dolor sit amet");',
                  },
                ],
                inserts: [
                  {
                    line: 6,
                    values: "    tempor(ipsum, adipiscing);",
                  },
                ],
              },
              {
                focus: [4, 7],
                replaces: [
                  {
                    line: 5,
                    values: '    sit.eiusmod("dolor sit amet");',
                  },
                  {
                    line: 4,
                    values: "  do {",
                  },
                  {
                    line: 7,
                    values: "  } while (++consectetur < amet);",
                  },
                ],
                inserts: [
                  {
                    line: 6,
                    values: "    tempor(ipsum, adipiscing);",
                  },
                ],
              },
              {
                replaces: [
                  {
                    line: 5,
                    values: '    sit.eiusmod("dolor sit amet");',
                  },
                  {
                    line: 4,
                    values: "  do {",
                  },
                  {
                    line: 7,
                    values: "  } while (++consectetur < amet);",
                  },
                ],
                inserts: [
                  {
                    line: 6,
                    values: "    tempor(ipsum, adipiscing);",
                  },
                ],
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}
