import Head from "next/head";
import { CodeTour } from "../components/CodeTour";

export default function Home() {
  const str = `function lorem(ipsum, dolor) {
  const sit = "lorem ipsum"
  dolor = elit(dolor, 3)
  while (++consectetur < amet) {
    // TODO
  }
}`;

  return (
    <>
      <Head>
        <title>Scrollery</title>
      </Head>
      <div>
        <CodeTour
          defaultSourceCode={str}
          language="javascript"
          steps={[
            {},
            { focus: [3, 5] },
            {
              focus: [3, 5],
              replace: {
                line: 4,
                values: "    dolor = elit(dolor, 3)",
              },
            },
            {
              focus: 4,
              replace: {
                line: 4,
                values: "    dolor = elit(dolor, 3)",
              },
            },
            {
              focus: [4, 5],
              replace: {
                line: 4,
                values:
                  "    dolor = elit(dolor, 3)\n    dolor = elit(dolor, 3)",
              },
            },
          ]}
        />
      </div>
    </>
  );
}
