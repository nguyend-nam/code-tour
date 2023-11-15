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

export default function CodeTourDemo() {
  return (
    <div className={styles.layout}>
      <CodeTour
        defaultSourceCode={str}
        language="javascript"
        showNavigationBar={false}
        showStepNameButtons
        steps={[
          { stepName: "Start" },
          {
            stepName: "Highlight",
            focus: [0, [4, 6]],
          },
          {
            stepName: "Highlight + Replace",
            focus: 5,
            replaces: [
              {
                line: 5,
                values: "    sit.eiusmod();",
              },
            ],
          },
          {
            stepName: "Highlight + Replace",
            focus: 5,
            replaces: [
              {
                line: 5,
                values: '    sit.eiusmod("dolor sit amet");',
              },
            ],
          },
          {
            stepName: "Highlight + Insert",
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
            stepName: "Highlight + Insert",
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
            stepName: "End",
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
        ]}
      />
    </div>
  );
}
