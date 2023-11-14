// @ts-ignore
import styles from "./styles.module.css";
import { CodeTour } from "../../../components";

const str = `function lorem(ipsum, dolor) {
  const sit = "lorem ipsum";
  dolor = elit(dolor, 3);
  
  while (++consectetur < amet) {
    // TODO
  }
}`;

export default function CodeTourDefaultDemo() {
  return (
    <div className={styles.layout}>
      <CodeTour
        defaultSourceCode={str}
        language="javascript"
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
  );
}
