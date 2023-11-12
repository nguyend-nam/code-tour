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
              focus: 4,
              replace: {
                line: 4,
                values: "    dolor",
              },
            },
            {
              focus: 4,
              replace: {
                line: 4,
                values: "    dolor = elit(dolor, 4)",
              },
            },
            {
              focus: 5,
              replace: {
                line: 4,
                values: "    dolor = elit(dolor, 4)\n    dolor",
              },
            },
            {
              focus: 5,
              replace: {
                line: 4,
                values:
                  "    dolor = elit(dolor, 4)\n    dolor = elit(dolor, 5)",
              },
            },
            {
              replace: {
                line: 4,
                values:
                  "    dolor = elit(dolor, 4)\n    dolor = elit(dolor, 5)",
              },
            },
          ]}
        />
      </div>
    </>
  );
}
